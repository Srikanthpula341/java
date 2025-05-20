import React from 'react';
import { render } from '@testing-library/react';
import Eligibility from './Eligibility';
import * as SharedComponents from '@optum-meteor/shared-components';

// Mock the AxiosProvider to observe usage
jest.mock('@optum-meteor/shared-components', () => ({
  AxiosProvider: ({ children, baseUrl }: any) => (
    <div data-testid="axios-provider" data-baseurl={baseUrl}>
      {children}
    </div>
  ),
}));

// Mock the EligibilityPage component
jest.mock('./EligibilityFiles', () => () => (
  <div data-testid="eligibility-page">Mocked EligibilityPage</div>
));

describe('Eligibility Component', () => {
  it('renders AxiosProvider and EligibilityPage', () => {
    const { getByTestId } = render(<Eligibility />);

    expect(getByTestId('axios-provider')).toBeInTheDocument();
    expect(getByTestId('eligibility-page')).toBeInTheDocument();
    expect(getByTestId('axios-provider')).toHaveAttribute('data-baseurl', '');
  });
});
