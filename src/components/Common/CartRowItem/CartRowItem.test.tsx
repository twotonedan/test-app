import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartRowItem from './CartRowItem';

describe('CartRowItem', () => {
  const props = {
    id: '5',
    $uniqueId: '5',
    cardId: '1',
    parentTitle: 'parent title',
    isMandatory: true,
    image: {
      src: './some-image.png',
      height: 200,
      width: 100,
    },
    alt: 'boat alt',
    title: 'TITLE',
    quantity: 5,
    limits: {
      max: 5,
      min: 0,
    },
    handleAddClick: jest.fn(),
    handleRemoveClick: jest.fn(),
    price: 55,
    className: 'test-class',
    showData: true,
    bookingInformation: {
      isMultiDay: false,
      quantity: 5,
      date: new Date(),
    },
    onClose: jest.fn(),
  };
  test('renders component', () => {
    render(<CartRowItem {...props} />);
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
  });
});
