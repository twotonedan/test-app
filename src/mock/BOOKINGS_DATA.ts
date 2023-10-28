import { BoatImage, LuxuryBoat2Image, LuxuryBoatImage, SecondBoatImage, YatchImage } from '@/assets/images';

import { toUTC } from '@/utils/timezone';
import { BookingStatusEnum, BookingActionRequiredEnum, IBooking } from '@/types/bookings';
import { addDays } from 'date-fns';
import { PageType, PredefinedCardTags, TagColor } from '@/types/enums';

const baseDate = toUTC(new Date());

export const BOOKINGS_DATA: IBooking[] = [
  {
    id: '32305',
    balanceDue: 1000,
    bookingUnits: [
      {
        id: '1',
        image: LuxuryBoatImage,
        alt: 'Boat Image',
        imagesDetail: [
          { src: LuxuryBoatImage, alt: 'Yatch Image', id: 1 },
          { src: YatchImage, alt: 'Luxury Boat Image', id: 2 },
          { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
          { src: YatchImage, alt: 'Yatch Image', id: 4 },
          { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 5 },
          { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 6 },
          { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 7 },
          { src: YatchImage, alt: 'Yatch Image', id: 8 },
        ],
        title: 'Ski Boat',
        bookingTime: {
          startDate: baseDate,
          endDate: addDays(baseDate, 1),
          startTime: {
            hour: 8,
            minutes: 30,
          },
          endTime: {
            hour: 10,
            minutes: 30,
          },
        },
        status: {
          label: BookingStatusEnum.ACTIVE,
          color: TagColor.GREEN,
        },
        locationName: 'Robert Robertson, 1234',
        price: 430.0,
        accessories: [
          {
            id: '1',
            title: 'Lifejacket',
            location: 'Philadelphia, PA',
            quantity: 5,
            price: 180,
            tag: { label: PredefinedCardTags.MANDATORY, color: TagColor.RED },
          },
          {
            id: '2',
            title: 'Boat Insurance',
            location: 'Ottawa, ON',
            quantity: 1,
            price: 480,
          },
          {
            id: '3',
            title: 'Lifejacket XXL',
            location: 'Jacksonville, FL',
            quantity: 3,
            price: 900,
          },
        ],
        guests: 6,
        drivers: 2,
        actionRequiredItems: [
          {
            name: BookingActionRequiredEnum.LIABILITY_WAIVER,
            completed: false,
          },
          {
            name: BookingActionRequiredEnum.CHECK_IN,
            completed: false,
          },
        ],
      },
      {
        id: '2',
        image: LuxuryBoatImage,
        alt: 'Boat Image',
        imagesDetail: [
          { src: LuxuryBoatImage, alt: 'Yatch Image', id: 1 },
          { src: YatchImage, alt: 'Luxury Boat Image', id: 2 },
          { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
          { src: YatchImage, alt: 'Yatch Image', id: 4 },
          { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 5 },
          { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 6 },
          { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 7 },
          { src: YatchImage, alt: 'Yatch Image', id: 8 },
        ],
        title: 'Ski Boat',
        bookingTime: {
          singleDate: baseDate,
          singleTime: {
            hour: 9,
            minutes: 30,
          },
        },
        status: {
          label: BookingStatusEnum.ACTIVE,
          color: TagColor.GREEN,
        },
        locationName: 'Robert Robertson, 1234',
        accessories: [
          {
            id: '1',
            title: 'Lifejacket',
            location: 'Philadelphia, PA',
            quantity: 5,
            price: 180,
            tag: { label: PredefinedCardTags.MANDATORY, color: TagColor.RED },
          },
          {
            id: '2',
            title: 'Boat Insurance',
            location: 'Ottawa, ON',
            quantity: 1,
            price: 480,
          },
          {
            id: '3',
            title: 'Lifejacket XXL',
            location: 'Jacksonville, FL',
            quantity: 3,
            price: 900,
          },
        ],
        price: 430,
        guests: 6,
        drivers: 2,
        actionRequiredItems: [
          {
            name: BookingActionRequiredEnum.LIABILITY_WAIVER,
            completed: false,
          },
          {
            name: BookingActionRequiredEnum.CHECK_IN,
            completed: false,
          },
          {
            name: BookingActionRequiredEnum.CHECK_OUT,
            completed: true,
            link: PageType.CHECKOUT,
          },
        ],
      },
    ],
  },
  {
    id: '32332',
    balanceDue: 0,
    bookingUnits: [
      {
        id: '1',
        image: LuxuryBoatImage,
        alt: 'Ski Boat 2',
        imagesDetail: [
          { src: LuxuryBoat2Image, alt: 'Luxury Boat 2 Image', id: 1 },
          { src: BoatImage, alt: 'Boat Image', id: 2 },
          { src: SecondBoatImage, alt: 'Second Boat Image', id: 3 },
        ],
        title: 'Ski Boat',
        bookingTime: {
          startDate: baseDate,
          endDate: addDays(baseDate, 1),
          startTime: {
            hour: 8,
            minutes: 30,
          },
          endTime: {
            hour: 10,
            minutes: 30,
          },
        },
        status: {
          label: BookingStatusEnum.CANCELLED,
          color: TagColor.RED,
        },
        locationName: 'New York',
        price: 1000,
      },
    ],
  },
];
