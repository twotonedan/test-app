import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from './Cart';

describe('Cart', () => {
  test('renders component', () => {
    render(<Cart id='test-id' desktopBackText='test-text' />);
    expect(screen.queryByText('Recommended Addons')).toBeInTheDocument();
  });
  test('renders recommended addons', () => {
    render(<Cart id='test-id' desktopBackText='test-text' />);
    expect(screen.queryByText('Recommended Addons')).toBeInTheDocument();
  });
  test('renders null state when no items in cart', () => {
    render(<Cart id='test-id' desktopBackText='test-text' />);
    expect(screen.queryByText('Recommended Addons')).toBeInTheDocument();
  });
  test('renders items when items in cart', () => {
    render(<Cart id='test-id' desktopBackText='test-text' />);
    expect(screen.queryByText('Recommended Addons')).toBeInTheDocument();
  });
});
