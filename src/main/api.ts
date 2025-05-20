import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import EligbilityPage from './index';

// Mock validator and uploader
jest.mock('../../utils/fileValidator', () => ({
  validateTextFile: jest.fn(),
}));

jest.mock('../../hooks/uploadEligibilityFile', () => ({
  uploadEligibilityFile: jest.fn(),
}));

describe('EligbilityPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger file download when clicking Download Template', () => {
    const clickSpy = jest.fn();
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    jest.spyOn(document, 'createElement').mockImplementation(() => {
      return {
        href: '',
        download: '',
        click: clickSpy,
        setAttribute: jest.fn(),
      } as unknown as HTMLAnchorElement;
    });

    render(<EligbilityPage />);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    userEvent.click(downloadButton);

    expect(clickSpy).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
  });

  it('should show error if file validation fails', async () => {
    const { validateTextFile } = require('../../utils/fileValidator');
    validateTextFile.mockResolvedValue('Invalid file');

    render(<EligbilityPage />);

    const file = new File(['invalid content'], 'test.txt', { type: 'text/plain' });

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(await screen.findByText('Invalid file')).toBeInTheDocument();
  });

  it('should upload file if validation passes', async () => {
    const { validateTextFile } = require('../../utils/fileValidator');
    const { uploadEligibilityFile } = require('../../hooks/uploadEligibilityFile');

    validateTextFile.mockResolvedValue(null);
    uploadEligibilityFile.mockResolvedValue({ success: true });

    render(<EligbilityPage />);

    const file = new File(['valid|file'], 'valid.txt', { type: 'text/plain' });

    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(validateTextFile).toHaveBeenCalledWith(file, expect.any(Number));
    expect(uploadEligibilityFile).toHaveBeenCalledWith(expect.anything(), 'file', file);
  });
});
