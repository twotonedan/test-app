import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { TagColor, CardComponentOption, BookingInformationType, CheckoutMethod } from '@/types/enums';
import { BoatImage } from '@/assets/images';
import ItemCard from './ItemCard';

const cardData = {
  id: '1',
  image: { width: 100, height: 50, src: './some-image.png' },
  alt: 'boat alt',
  imagesDetail: [
    {
      alt: 'boat',
      id: 4,
      src: BoatImage
    },
  ],
  title: 'TITLE',
  tagline: 'Tag Your It',
  description: {
    text: 'Description',
    maxChars: 244,
  },
  date: new Date(),
  dateRange: {
    start: new Date(),
    end: new Date(),
  },
  amenities: [],
  topSectionComponent: CardComponentOption.DESCRIPTION,
  bottomSectionComponent: CardComponentOption.AMENITIES,
  otherDates: [],
  calendarInfo: {
    '2021-08-01T00:00:00.000Z': {
      price: 500,
      isHoliday: true,
      isUnavailable: false,
    },
  },
  bookingInformationOption: BookingInformationType.CUSTOM_RANGE,
  limits: { max: 5, min: 0 },
  tag: {
    label: 'Tag Title',
    color: TagColor.RED,
  },
  defaultAccessories: [],
  checkoutMethod: CheckoutMethod.ADD_TO_CART,
  policies: 'Policy',
};

describe('ItemCard', () => {
  test('renders component', () => {
    render(<ItemCard cardData={cardData} isUnavailable />);
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
    expect(screen.queryByText('Description')).toBeInTheDocument();
    expect(screen.queryByText('Tag Your It')).toBeInTheDocument();
  });
  test('clicking waitlist button, opens waitlist modal', () => {
    render(<ItemCard cardData={cardData} isUnavailable />);
    // click waitlist button
    userEvent.click(screen.getByText('Join Waitlist'));
    // expect waitlist modal to be open
    expect(screen.queryByText('First Name')).toBeInTheDocument();
  });
  test('clicking booking button, opens upsell modal', () => {
    render(<ItemCard cardData={cardData} isUnavailable />);
    // click booking button
    userEvent.click(screen.getByText('Book Now'));
    // expect upsell modal to be open
    expect(screen.queryByText('Cart')).toBeInTheDocument();
  });
});
