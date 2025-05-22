import { getUserInfo } from './path-to-your-function';

describe('getUserInfo', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should return fname and lname when userData exists in sessionStorage', () => {
    const mockUserData = {
      givenName: 'Srikanth',
      familyName: 'Pula',
    };
    sessionStorage.setItem('userData', JSON.stringify(mockUserData));

    const result = getUserInfo();
    expect(result).toEqual({ fname: 'Srikanth', lname: 'Pula' });
  });

  it('should return null if userData is not in sessionStorage', () => {
    const result = getUserInfo();
    expect(result).toBeNull();
  });

  it('should return null if userData is invalid JSON', () => {
    sessionStorage.setItem('userData', 'invalid-json');

    const result = getUserInfo();
    expect(result).toBeNull();
  });
});
