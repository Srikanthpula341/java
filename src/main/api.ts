import {
    validateTextFile,
    isvalidFileType,
    ALLOWED_FILE_TYPES
  } from './fileValidator';
  
  import aemContent from '../aemContent.json';
  
  describe('validateTextFile', () => {
    const maxSize = 1000;
  
    it('should return fileSizeError if file size exceeds maxSize', async () => {
      const file = new File(['x'.repeat(maxSize + 1)], 'large.txt', {
        type: 'text/plain',
      });
      Object.defineProperty(file, 'size', { value: maxSize + 1 });
  
      const result = await validateTextFile(file, maxSize);
      expect(result).toBe(aemContent.fileSizeError);
    });
  
    it('should return fileTypeError if file type is not text/plain', async () => {
      const file = new File(['test content'], 'invalid.csv', {
        type: 'text/csv',
      });
  
      const result = await validateTextFile(file, maxSize);
      expect(result).toBe(aemContent.fileTypeError);
    });
  
    it('should return fileDelimitError if file does not contain delimiter |', async () => {
      const file = new File(['no delimiter here'], 'test.txt', {
        type: 'text/plain',
      });
  
      const result = await validateTextFile(file, maxSize);
      expect(result).toBe(aemContent.fileDelimitError);
    });
  
    it('should return null if file is valid and contains delimiter', async () => {
      const file = new File(['valid|file'], 'test.txt', {
        type: 'text/plain',
      });
  
      const result = await validateTextFile(file, maxSize);
      expect(result).toBeNull(); // Line `return null;`
    });
  });
  
  describe('isvalidFileType', () => {
    it('should return true for valid MIME type', () => {
      const file = new File(['dummy'], 'valid.txt', { type: 'text/plain' });
      const result = isvalidFileType(file, ALLOWED_FILE_TYPES);
      expect(result).toBe(true); // Line `return allowedTypes.includes(file.type);`
    });
  
    it('should return false for invalid MIME type', () => {
      const file = new File(['dummy'], 'invalid.csv', { type: 'text/csv' });
      const result = isvalidFileType(file, ALLOWED_FILE_TYPES);
      expect(result).toBe(false);
    });
  });
  