import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FiltersModal from './FiltersModal';

describe('FiltersModal', () => {
  test('renders component', () => {
    const props = {
      id: 'test-modal',
      onClose: jest.fn(),
      children: <div>children</div>,
      onClearAll: jest.fn(),
      title: 'title',
      name: 'name',
    }

    render(<FiltersModal {...props} />);
    expect(screen.queryByText('title')).toBeInTheDocument();
  });
});
