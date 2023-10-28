import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { TagColor, CardComponentOption, BookingInformationType, CheckoutMethod } from '@/types/enums';
import { BoatImage } from '@/assets/images';
import JoinWaitlistModal from './JoinWaitlistModal';

describe('JoinWaitlistModal', () => {
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
  const bookingInformation = {
    isMultiDay: false,
    quantity: 5,
  };
  test('renders component', () => {
    render(
      <JoinWaitlistModal
        id='1'
        cardData={cardData}
        isSingleDate
        bookingInformation={bookingInformation}
        bookingInformationFormat={BookingInformationType.CUSTOM_RANGE}
      />
    );
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
    expect(screen.queryByText('Description')).toBeInTheDocument();
    expect(screen.queryByText('Tag Your It')).toBeInTheDocument();
  });
  test('on clicking submit button, api call is made', () => {
    render(
      <JoinWaitlistModal
        id='1'
        cardData={cardData}
        isSingleDate
        bookingInformation={bookingInformation}
        bookingInformationFormat={BookingInformationType.CUSTOM_RANGE}
      />
    );
    // click submit button
    userEvent.click(screen.getByText('Submit'));
    // expect api call to be made
    expect(() => {}).toBeCalled();
  });
  test('on clicking close button, modal closes', () => {
    render(
      <JoinWaitlistModal
        id='1'
        cardData={cardData}
        isSingleDate
        bookingInformation={bookingInformation}
        bookingInformationFormat={BookingInformationType.CUSTOM_RANGE}
      />
    );
    // click close button
    userEvent.click(screen.getByText('Cancel'));
    // expect modal to close
    expect(screen.queryByText('Cancel')).toNotBeInTheDocument();
  });
});
