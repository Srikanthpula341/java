import { validateTextFile } from './fileValidator';
import aemContent from '../aemContent.json';

describe('validateTextFile', () => {
  const maxSize = 1000;

  it('should return size error if file exceeds max size', async () => {
    const file = new File(['x'.repeat(maxSize + 1)], 'test.txt', { type: 'text/plain' });
    Object.defineProperty(file, 'size', { value: maxSize + 1 });
    const result = await validateTextFile(file, maxSize);
    expect(result).toBe(aemContent.fileSizeError);
  });

  it('should return type error if file is not text/plain', async () => {
    const file = new File(['dummy content'], 'test.csv', { type: 'text/csv' });
    const result = await validateTextFile(file, maxSize);
    expect(result).toBe(aemContent.fileTypeError);
  });

  it('should return delimiter error if file content does not contain "|"', async () => {
    const file = new File(['no-delimiter'], 'test.txt', { type: 'text/plain' });
    const result = await validateTextFile(file, maxSize);
    expect(result).toBe(aemContent.fileDelimitError);
  });

  it('should return null for valid file', async () => {
    const file = new File(['abc|def'], 'test.txt', { type: 'text/plain' });
    const result = await validateTextFile(file, maxSize);
    expect(result).toBeNull();
  });
});
