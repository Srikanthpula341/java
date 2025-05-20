import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Eligibility from './index';
import { validateTextFile } from '../../utils/fileValidator';
import { uploadEligibilityFile } from '../../hooks/uploadEligibilityFile';

jest.mock('../../utils/fileValidator', () => ({
  validateTextFile: jest.fn(),
}));

jest.mock('../../hooks/uploadEligibilityFile', () => ({
  uploadEligibilityFile: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
    if (tagName === 'a') {
      const anchor = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      anchor.click = jest.fn();
      return anchor;
    }
    return document.createElement(tagName);
  });
});

describe('Eligibility Component', () => {
  it('should show error and reset input if file is too large', async () => {
    const file = new File(['a'.repeat(2000)], 'big.txt', { type: 'text/plain' });
    Object.defineProperty(file, 'size', { value: 2000 });

    (validateTextFile as jest.Mock).mockResolvedValue('File too large');

    render(<Eligibility />);
    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, file);

    expect(await screen.findByText('File too large')).toBeInTheDocument();
    expect((fileInput as HTMLInputElement).value).toBe('');
  });

  it('should show error if file type is not text/plain', async () => {
    const file = new File(['data'], 'data.csv', { type: 'text/csv' });
    (validateTextFile as jest.Mock).mockResolvedValue('Invalid type');

    render(<Eligibility />);
    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, file);

    expect(await screen.findByText('Invalid type')).toBeInTheDocument();
    expect((fileInput as HTMLInputElement).value).toBe('');
  });

  it('should show error if file content does not contain delimiter', async () => {
    const file = new File(['no delimiter'], 'bad.txt', { type: 'text/plain' });
    file.text = jest.fn().mockResolvedValue('no delimiter');

    (validateTextFile as jest.Mock).mockResolvedValue('Missing delimiter');

    render(<Eligibility />);
    const fileInput = screen.getByTestId('file-input');
    await userEvent.upload(fileInput, file);

    expect(await screen.findByText('Missing delimiter')).toBeInTheDocument();
    expect((fileInput as HTMLInputElement).value).toBe('');
  });

  it('should show error if upload fails after valid validation', async () => {
    (validateTextFile as jest.Mock).mockResolvedValue(null);
    (uploadEligibilityFile as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Upload failed',
    });

    render(<Eligibility />);
    const file = new File(['valid|pipe'], 'good.txt', { type: 'text/plain' });
    const fileInput = screen.getByTestId('file-input');

    await userEvent.upload(fileInput, file);
    expect(await screen.findByText('Upload failed')).toBeInTheDocument();
  });
});
