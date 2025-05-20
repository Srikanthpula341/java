import { getTodayDate } from './helpers';

describe('getTodayDate', () => {
  it('should return date in MM/DD/YYYY format', () => {
    const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    const expected = `${mm}/${dd}/${yyyy}`;

    expect(getTodayDate()).toBe(expected);
  });
});
import { isvalidFileType, ALLOWED_FILE_TYPES } from './fileValidator';

describe('fileValidator.ts', () => {
  it('should return true for valid file type', () => {
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    expect(isvalidFileType(file, ALLOWED_FILE_TYPES)).toBe(true);
  });

  it('should return false for invalid file type', () => {
    const file = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });
    expect(isvalidFileType(file, ALLOWED_FILE_TYPES)).toBe(false);
  });
});
