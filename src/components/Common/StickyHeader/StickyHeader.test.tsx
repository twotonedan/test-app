import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StickyHeader from './StickyHeader';

describe('StickyHeader', () => {
  const props = {
    leftComponent: <div>leftComponent</div>,
    middleComponent: <div>middleComponent</div>,
    rightComponent: <div>rightComponent</div>,
    className: 'className',
    useImmediateParent: false
  }
  test('renders component', () => {
    render(<StickyHeader {...props} />);
    expect(screen.queryByText('leftComponent')).toBeInTheDocument();
    expect(screen.queryByText('middleComponent')).toBeInTheDocument();
    expect(screen.queryByText('rightComponent')).toBeInTheDocument();
  });
});
