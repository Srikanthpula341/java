import { fetchEligibilityFiles } from './fetchEligibilityFiles';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { FILE_LIST_URL } from '../utils/endPoints';

describe('fetchEligibilityFiles', () => {
  const mockAxios = new AxiosMockAdapter(axios);
  const dummyFile = new File(['dummy content'], 'dummy.csv', {
    type: 'text/csv',
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return data on successful fetch', async () => {
    const mockData = [{ fileName: 'eligibility.csv' }];
    mockAxios.onGet(FILE_LIST_URL).reply(200, mockData);

    const result = await fetchEligibilityFiles(axios, 'dummyType', dummyFile);
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeUndefined();
  });

  it('should return error on failed fetch', async () => {
    mockAxios.onGet(FILE_LIST_URL).networkError();

    const result = await fetchEligibilityFiles(axios, 'dummyType', dummyFile);
    expect(result.data).toEqual([]);
    expect(result.error).toContain('Network Error');
  });
});





import { uploadEligibilityFile } from './uploadEligibilityFile';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { FILE_UPLOAD_URL } from '../utils/endPoints';

describe('uploadEligibilityFile', () => {
  const mockAxios = new AxiosMockAdapter(axios);
  const dummyFile = new File(['test content'], 'test.csv', { type: 'text/csv' });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return success on valid upload', async () => {
    mockAxios.onPost(FILE_UPLOAD_URL).reply(200);

    const result = await uploadEligibilityFile(axios, 'dummyType', dummyFile);
    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return error on upload failure', async () => {
    mockAxios.onPost(FILE_UPLOAD_URL).reply(500);

    const result = await uploadEligibilityFile(axios, 'dummyType', dummyFile);
    expect(result.success).toBe(false);
    expect(result.error).toContain('500');
  });
});



import { fetchEligibilityFiles } from './fetchEligibilityFiles';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { FILE_LIST_URL } from '../utils/endPoints';

describe('fetchEligibilityFiles', () => {
  const mockAxios = new AxiosMockAdapter(axios);
  const dummyFile = new File(['dummy content'], 'dummy.csv', {
    type: 'text/csv',
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should return data on successful fetch', async () => {
    const mockData = [{ fileName: 'eligibility.csv' }];
    mockAxios.onGet(FILE_LIST_URL).reply(200, mockData);

    const result = await fetchEligibilityFiles(axios, 'dummyType', dummyFile);
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeUndefined();
  });

  it('should return error on failed fetch', async () => {
    mockAxios.onGet(FILE_LIST_URL).networkError();

    const result = await fetchEligibilityFiles(axios, 'dummyType', dummyFile);
    expect(result.data).toEqual([]);
    expect(result.error).toContain('Network Error');
  });
});
