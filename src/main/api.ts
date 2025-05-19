import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Eligibility from '.';

const mockUserRole = 'SuperUser';

jest.mock('@optum-meteor/shared-components', () => ({
  MtrTable: ({ data, columns }: any) => (
    <div data-testid="mock-mtr-table">
      <table>
        <thead>
          <tr>
            {columns.map((col: any) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: any) => (
            <tr key={row.fileName || `unique-${JSON.stringify(row)}`} data-testid={`table-row-${rowIndex}`}>
              {columns.map((col: any) => (
                <td key={String(col.key)} data-testid={`cell-${String(col.key)}-${rowIndex}`}>
                  {col.renderCell ? col.renderCell(row) : String(row[col.key] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  MtrSortOrder: {
    Asc: 'asc',
    Desc: 'desc',
    Default: 'default'
  },
  RoleAccessControl: ({ children, validRoles }: any) => {
    const hasAccess = validRoles.includes(mockUserRole);
    return hasAccess ? children : null;
  },
  UserRole: {
    SuperUser: 'SuperUser',
    ApproverAnalyst: 'ApproverAnalyst',
    User: 'User',
  },
}));

jest.mock('@optum-rx-skyline/components', () => ({
  CustomAlert: ({ content, severity, displayCloseBtn }: any) => (
    <div data-testid="custom-alert" data-severity={severity} data-content={content}>
      {content}
      {displayCloseBtn && <button data-testid="close-alert-btn">Close</button>}
    </div>
  ),
}));

jest.mock('../../aemContent.json', () => ({
  breadcrumbHeaderText: 'Home',
  breadcrumbText: 'Eligibility Files',
  title: 'Eligibility Files',
  downloadTemplate: 'Download Template',
  uploadFile: 'Upload File',
  uploadingFile: 'Uploading File',
}));

jest.mock('../../hooks/useUploadEligibilityFile', () => ({
  useUploadEligibilityFile: () => ({
    upload: jest.fn().mockResolvedValue(true),
    uploading: false,
    error: null,
  }),
}));

jest.mock('../../hooks/useElighibilityFiles', () => ({
  useFetchEligibilityFiles: () => ({
    files: [
      { id: 1, fileName: 'test1.txt', totalRecords: 100, associationExist: 'Yes', associationCreated: 'Yes', planCreated: 'Yes', errors: 3, errorDetails: [], uploadDate: '2025-05-18', uploadedBy: 'Admin', status: 'Complete' },
      { id: 2, fileName: 'test2.txt', totalRecords: 50, associationExist: 'Yes', associationCreated: 'Yes', planCreated: 'Yes', errors: 12, errorDetails: [], uploadDate: '2025-05-18', uploadedBy: 'Admin', status: 'Complete' },
      { id: 3, fileName: 'test3.txt', totalRecords: 30, associationExist: 'Yes', associationCreated: 'Yes', planCreated: 'Yes', errors: 8, errorDetails: [], uploadDate: '2025-05-18', uploadedBy: 'Admin', status: 'Complete' },
      { id: 4, fileName: 'test4.txt', totalRecords: 70, associationExist: 'Yes', associationCreated: 'Yes', planCreated: 'Yes', errors: 5, errorDetails: [], uploadDate: '2025-05-18', uploadedBy: 'Admin', status: 'Complete' }
    ],
    loading: false,
    error: null,
    fetchList: jest.fn(),
  }),
}));

describe('Eligibility Component', () => {
  it('renders the component with correct title and buttons', () => {
    render(<Eligibility />);
    expect(screen.getAllByText('Eligibility Files')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download Template/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upload File/i })).toBeInTheDocument();
  });

  it('displays breadcrumbs correctly', () => {
    render(<Eligibility />);
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getAllByText('Eligibility Files')[0]).toBeInTheDocument();
  });

  it('renders table with mock data', () => {
    render(<Eligibility />);
    expect(screen.getByTestId('mock-mtr-table')).toBeInTheDocument();
    expect(screen.getByText('File name')).toBeInTheDocument();
    expect(screen.getByText('Total records')).toBeInTheDocument();
    expect(screen.getByText('Plan association exists')).toBeInTheDocument();
    expect(screen.getByText('Association created')).toBeInTheDocument();
    expect(screen.getByText('Shell plan created')).toBeInTheDocument();
    expect(screen.getByText('File status')).toBeInTheDocument();
    expect(screen.getByText('Uploaded By')).toBeInTheDocument();
    expect(screen.getByText('Upload date')).toBeInTheDocument();
  });

  it('triggers file input when clicking on upload button', () => {
    render(<Eligibility />);
    const clickSpy = jest.spyOn(HTMLInputElement.prototype, 'click');
    fireEvent.click(screen.getByText(/Upload File/i));
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('handles file selection', async () => {
    render(<Eligibility />);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    expect(fileInput).not.toBeNull();
    await userEvent.upload(fileInput!, file);
    expect(fileInput!.files![0]).toBe(file);
  });

  it('renders error buttons with correct values', () => {
    render(<Eligibility />);
    const errorCells = screen.getAllByTestId(/^cell-errors-\d+$/);
    expect(errorCells).toHaveLength(4);
    const errorButtons = errorCells.map((cell) => cell.querySelector('button'));
    expect(errorButtons[0]).toHaveTextContent('3');
    expect(errorButtons[1]).toHaveTextContent('12');
    expect(errorButtons[2]).toHaveTextContent('8');
    expect(errorButtons[3]).toHaveTextContent('5');
  });

  it('download template button has correct icon', () => {
    render(<Eligibility />);
    const downloadButton = screen.getByText('Download Template');
    expect(downloadButton).toBeInTheDocument();
    const icon = downloadButton.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('shows error alert when file size exceeds 1MB', async () => {
    render(<Eligibility />);
    const largeFile = new File([new Array(1048577).fill('a').join('')], 'large.txt', { type: 'text/plain' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await userEvent.upload(fileInput, largeFile);
    const alert = screen.getByTestId('custom-alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute('data-content', 'File size exceeds the 1 MB limit');
    expect(alert).toHaveAttribute('data-severity', 'error');
  });

  it('creates and triggers download when download template button is clicked', () => {
    const mockClick = jest.fn();
    const mockLink = {
      set href(val: string) {},
      set download(val: string) {},
      click: mockClick,
    };

    const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValue(mockLink as unknown as HTMLAnchorElement);
    const appendSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => document.body);
    const removeSpy = jest.spyOn(document.body, 'removeChild').mockImplementation(() => document.body);

    render(<Eligibility />);
    fireEvent.click(screen.getByText('Download Template'));

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(mockClick).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
