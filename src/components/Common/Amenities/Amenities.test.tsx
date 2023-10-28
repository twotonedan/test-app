import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SupportedIconsEnum } from '@/types/enums';
import Amenities from './Amenities';

const amenities = [
  {
    id: 1,
    icon: SupportedIconsEnum.ANCHOR_OUTLINED,
    text: 'anchor',
  },
  {
    id: 2,
    icon: SupportedIconsEnum.APPLE,
    text: 'apple',
  },
];

describe('Amenities', () => {
  test('renders amenities', () => {
    render(<Amenities amenities={amenities} className='test-class' />);
    expect(screen.queryByText('anchor')).toBeInTheDocument();
    expect(screen.queryByText('apple')).toBeInTheDocument();
  });
  test('renders wrapper with supplied class', () => {
    render(<Amenities amenities={amenities} className='test-class' />);
    //TODO: get wrapper and check for class
    expect(screen.queryByText('anchor')).toBeInTheDocument();
  });
  test('renders with no supplied amenities', () => {
    render(<Amenities amenities={[]} className='test-class' />);
    //TODO: check for wrapper
    expect(screen.queryByText('anchor')).toBeInTheDocument();
  });
});
