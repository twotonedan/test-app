import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TagColor, CardComponentOption, BookingInformationType, CheckoutMethod } from '@/types/enums';
import { BoatImage } from '@/assets/images';
import CartGroupItem from './CartGroupItem';

describe('CartGroupItem', () => {
  const items = [
    {
      items: [
        {
          $uniqueId: 5,
          $selectedDuration: 5,
          subTotal: 5,
          total: 5,
          accessories: {
            // 'aa': {
            //   $metadata: {},
            //   $quantity: 5,
            //   total: 5,
            //   price: 5,
            //   $uniqueId: '5',
            //   $selectedDuration: 5,
            //   subTotal: 5,
            //   accessories: [],
            // },
          },
        },
      ],
      $uniqueId: '5',
      $selectedDuration: 5,
      accessories: {
        // 'aa': {
        //   $metadata: {
        //     id: '1',
        //     images: [{ width: 100, height: 50, src: './some-image.png' }],
        //     alt: 'boat alt',
        //     tag: {
        //       label: 'Tag Title',
        //       color: TagColor.RED,
        //     },
        //     title: 'TITLE ACC',
        //     tagline: 'Tag Your It',
        //     description: 'Description',
        //     subTitle: 'Sub Title',
        //     limits: { max: 5, min: 0 },
        //     price: 5,
        //   },
        //   $quantity: 5,
        //   total: 5,
        //   price: 5,
        //   $uniqueId: '5',
        //   $selectedDuration: 5,
        //   subTotal: 5,
        //   accessories: [],
        // },
      },
      subTotal: 55,
      total: 65,
      $metadata: {
        id: '1',
        image: BoatImage,
        alt: 'boat alt',
        imagesDetail: [
          {
            alt: 'boat',
            id: 4,
            src: BoatImage,
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
      },
      $quantity: 5,
      price: 5,
    },
  ];
  const onClickAddItem = jest.fn();
  const onClickRemoveItem = jest.fn();
  const onClickAddAccessory = jest.fn();
  const onClickRemoveAccessory = jest.fn();
  const onCloseModal = jest.fn();
  test('renders component', () => {
    render(
      <CartGroupItem
        items={items}
        onClickAddItem={onClickAddItem}
        onClickRemoveItem={onClickRemoveItem}
        onClickAddAccessory={onClickAddAccessory}
        onClickRemoveAccessory={onClickRemoveAccessory}
        onCloseModal={onCloseModal}
      />
    );
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
    expect(screen.queryByText('TITLE ACC')).toBeInTheDocument();
  });
  test('renders item and accessories', () => {
    render(
      <CartGroupItem
        items={items}
        onClickAddItem={onClickAddItem}
        onClickRemoveItem={onClickRemoveItem}
        onClickAddAccessory={onClickAddAccessory}
        onClickRemoveAccessory={onClickRemoveAccessory}
        onCloseModal={onCloseModal}
      />
    );
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
    expect(screen.queryByText('TITLE ACC')).toBeInTheDocument();
  });
  test('onClickAddItem', () => {
    render(
      <CartGroupItem
        items={items}
        onClickAddItem={onClickAddItem}
        onClickRemoveItem={onClickRemoveItem}
        onClickAddAccessory={onClickAddAccessory}
        onClickRemoveAccessory={onClickRemoveAccessory}
        onCloseModal={onCloseModal}
      />
    );
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
  });
  // find button
  // click button
  // expect onClickAddItem to be called
  test('onClickRemoveItem', () => {
    render(
      <CartGroupItem
        items={items}
        onClickAddItem={onClickAddItem}
        onClickRemoveItem={onClickRemoveItem}
        onClickAddAccessory={onClickAddAccessory}
        onClickRemoveAccessory={onClickRemoveAccessory}
        onCloseModal={onCloseModal}
      />
    );
    // find button
    // click button
    // expect onClickRemoveItem to be called
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
  });
  test('onClickAddAccessory', () => {
    render(
      <CartGroupItem
        items={items}
        onClickAddItem={onClickAddItem}
        onClickRemoveItem={onClickRemoveItem}
        onClickAddAccessory={onClickAddAccessory}
        onClickRemoveAccessory={onClickRemoveAccessory}
        onCloseModal={onCloseModal}
      />
    );
    // find button
    // click button
    // expect onClickAddAccessory to be called
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
  });
  test('onClickRemoveAccessory', () => {
    render(
      <CartGroupItem
        items={items}
        onClickAddItem={onClickAddItem}
        onClickRemoveItem={onClickRemoveItem}
        onClickAddAccessory={onClickAddAccessory}
        onClickRemoveAccessory={onClickRemoveAccessory}
        onCloseModal={onCloseModal}
      />
    );
    // find button
    // click button
    // expect onClickRemoveAccessory to be called
    expect(screen.queryByText('TITLE')).toBeInTheDocument();
  });
});
