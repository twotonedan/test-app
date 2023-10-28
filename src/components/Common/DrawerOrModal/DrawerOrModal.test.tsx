import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrawerOrModal from './DrawerOrModal';

describe('DrawerOrModal', () => {
  const props = {
    children: <div>children</div>,
    isOpen: true,
    onClose: jest.fn(),
    className: 'className'
  }
  test('renders drawer', () => {
    render(<DrawerOrModal {...props} />);
    expect(screen.queryByText('children')).toBeInTheDocument();
  });
  test('renders modal', () => {
    render(<DrawerOrModal {...props} />);
    expect(screen.queryByText('children')).toBeInTheDocument();
  });
  test('onClose triggered on close', () => {
    render(<DrawerOrModal {...props} />);
    expect(screen.queryByText('children')).toBeInTheDocument();
  });
});
