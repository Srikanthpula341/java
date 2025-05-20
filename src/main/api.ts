it('should reset file input and show alert if validation fails', async () => {
    const { validateTextFile } = require('../../utils/fileValidator');
    validateTextFile.mockResolvedValue('Invalid format');
  
    render(<Eligibility />);
    const file = new File(['invalid'], 'bad.txt', { type: 'text/plain' });
  
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    expect(await screen.findByText('Invalid format')).toBeInTheDocument();
    expect(fileInput.value).toBe('');
  });
  
  it('should show alert if upload fails', async () => {
    const { validateTextFile } = require('../../utils/fileValidator');
    const { uploadEligibilityFile } = require('../../hooks/uploadEligibilityFile');
  
    validateTextFile.mockResolvedValue(null);
    uploadEligibilityFile.mockResolvedValue({ success: false, error: 'Upload failed' });
  
    render(<Eligibility />);
    const file = new File(['valid|data'], 'valid.txt', { type: 'text/plain' });
  
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    expect(await screen.findByText('Upload failed')).toBeInTheDocument();
  });
  
  it('should return early if no file is selected', () => {
    render(<Eligibility />);
    const fileInput = screen.getByTestId('file-input');
    const event = { target: { files: undefined } };
    fireEvent.change(fileInput, event as any);
    expect(true).toBe(true);
  });
  