import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FooterDrawer from './FooterDrawer';

describe('FooterDrawer', () => {
  test('renders component', () => {
    const props = {
      children: <div>children</div>,
      className: 'className'
    }

    render(<FooterDrawer {...props} />);
    expect(screen.queryByText('title')).toBeInTheDocument();
  });
});
