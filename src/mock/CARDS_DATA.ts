import { BoatImage, KayakImage, LuxuryBoat2Image, LuxuryBoatImage, SecondBoatImage, YatchImage } from '@/assets/images';
import { ICardPayload } from '@/types/cards';
import {
  CardComponentOption,
  BookingInformationType,
  SupportedIconsEnum,
  PredefinedCardTags,
  TagColor,
  CheckoutMethod,
} from '@/types/enums';
import { addDays, addMonths } from 'date-fns';
import { toUTC } from '@/utils/timezone';
import { POLICIES_DESCRIPTION } from './POLICIES';
import { CALENDAR_INFO_1, CALENDAR_INFO_2 } from './CALENDAR_INFO';

const baseDate = toUTC(new Date());

export const CARDS_DATA: ICardPayload[] = [
  {
    id: '1',
    image: BoatImage,
    alt: 'Boat Image',
    imagesDetail: [
      { src: YatchImage, alt: 'Yatch Image', id: 1 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 2 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
      { src: YatchImage, alt: 'Yatch Image', id: 4 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 5 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 6 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 7 },
      { src: YatchImage, alt: 'Yatch Image', id: 8 },
    ],
    title: 'Ski Boat',
    tagline: 'The fastest boat we have!',

    description: {
      text: 'The fastest boat we have! Don’t miss it, you will have a great time at sea. The fastest boat we have! Don’t miss it, you will have a great time at sea. The fastest boat we have! Don’t miss it, you will have a great time at sea.',
      maxChars: 120,
    },
    isUnavailable: false,
    calendarInfo: CALENDAR_INFO_1,
    date: baseDate,
    otherDates: [
      { date: addMonths(baseDate, 4), id: 1 },
      { date: addMonths(baseDate, 5), id: 2 },
      { date: addMonths(baseDate, 6), id: 3 },
    ],
    amenities: [
      { id: 1, icon: SupportedIconsEnum.PEOPLE, text: '7 people' },
      { id: 2, icon: SupportedIconsEnum.MAXIMIZE, text: '24 ft' },
      { id: 3, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 4, icon: SupportedIconsEnum.CAT, text: 'Yes' },
      { id: 5, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 6, icon: SupportedIconsEnum.CAT, text: 'Yes' },
    ],
    topSectionComponent: CardComponentOption.DESCRIPTION,
    bottomSectionComponent: CardComponentOption.AMENITIES,
    bookingInformationOption: BookingInformationType.DURATION,
    limits: { max: 100, min: 0 },
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    defaultAccessories: [
      { id: '1', quantity: 1 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 1, location: undefined },
    ],
    checkoutMethod: CheckoutMethod.ADD_TO_CART,
  },
  {
    id: '2',
    image: SecondBoatImage,
    alt: 'Ski Boat Image',
    imagesDetail: [
      { src: YatchImage, alt: 'Yatch Image', id: 1 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 2 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
    ],
    title: 'Ski Boat',
    tagline: 'The second fastest boat we have!',
    description: {
      text: 'The second fastest boat we have! Don’t miss it, you will have a great time at sea.',
      maxChars: 100,
    },
    isUnavailable: false,
    calendarInfo: CALENDAR_INFO_2,
    date: baseDate,
    otherDates: [
      { date: addMonths(baseDate, 4), id: 1 },
      { date: addMonths(baseDate, 5), id: 2 },
      { date: addMonths(baseDate, 6), id: 3 },
    ],
    amenities: [
      { id: 1, icon: SupportedIconsEnum.PEOPLE, text: '7 people' },
      { id: 2, icon: SupportedIconsEnum.MAXIMIZE, text: '24 ft' },
      { id: 3, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 4, icon: SupportedIconsEnum.CAT, text: 'Yes' },
    ],
    topSectionComponent: CardComponentOption.DESCRIPTION,
    bookingInformationOption: BookingInformationType.PREDEFINED,
    limits: { max: 100, min: 0 },
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    defaultAccessories: [
      { id: '1', quantity: 1 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 1, location: undefined },
    ],
    checkoutMethod: CheckoutMethod.BOOK_NOW,
  },
  {
    id: '3',
    image: SecondBoatImage,
    alt: 'Ski Boat Image',
    imagesDetail: [
      { src: YatchImage, alt: 'Yatch Image', id: 1 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 2 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
    ],
    title: 'Ski Boat',
    tagline: 'The second fastest boat we have!',
    description: {
      text: 'The second fastest boat we have! Don’t miss it, you will have a great time at sea.',
      maxChars: 110,
    },
    isUnavailable: false,
    calendarInfo: CALENDAR_INFO_1,
    date: baseDate,
    otherDates: [
      { date: addMonths(baseDate, 4), id: 1 },
      { date: addMonths(baseDate, 5), id: 2 },
      { date: addMonths(baseDate, 6), id: 3 },
    ],
    amenities: [
      { id: 1, icon: SupportedIconsEnum.PEOPLE, text: '7 people' },
      { id: 2, icon: SupportedIconsEnum.MAXIMIZE, text: '24 ft' },
      { id: 3, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 4, icon: SupportedIconsEnum.CAT, text: 'Yes' },
    ],
    topSectionComponent: CardComponentOption.DESCRIPTION,
    bookingInformationOption: BookingInformationType.CUSTOM_RANGE,
    limits: { max: 100, min: 0 },
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    defaultAccessories: [
      { id: '1', quantity: 1 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 1, location: undefined },
    ],
    checkoutMethod: CheckoutMethod.ADD_TO_CART,
  },
  {
    id: '4',
    image: KayakImage,
    alt: 'Kayak Image',
    imagesDetail: [
      { src: YatchImage, alt: 'Yatch Image', id: 1 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 2 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
      { src: YatchImage, alt: 'Yatch Image', id: 4 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 5 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 6 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 7 },
      { src: YatchImage, alt: 'Yatch Image', id: 8 },
    ],
    title: 'Ski Boat',
    tagline: 'The fastest kayak we have!',
    description: {
      text: 'The fastest kayak we have! Don’t miss it, you will have a great time at sea.',
      maxChars: 140,
    },
    isUnavailable: true,
    calendarInfo: CALENDAR_INFO_2,
    dateRange: {
      start: baseDate,
      end: addDays(baseDate, 1),
    },
    otherDates: [
      {
        dateRange: {
          start: addMonths(baseDate, 4),
          end: addDays(addMonths(baseDate, 4), 1),
        },
        id: 1,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 5),
          end: addDays(addMonths(baseDate, 5), 1),
        },
        id: 2,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 6),
          end: addDays(addMonths(baseDate, 6), 1),
        },
        id: 3,
      },
    ],
    amenities: [
      { id: 1, icon: SupportedIconsEnum.PEOPLE, text: '7 people' },
      { id: 2, icon: SupportedIconsEnum.MAXIMIZE, text: '24 ft' },
      { id: 3, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 4, icon: SupportedIconsEnum.CAT, text: 'Yes' },
    ],
    topSectionComponent: CardComponentOption.AMENITIES,
    limits: { max: 100, min: 0 },
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    defaultAccessories: [
      { id: '1', quantity: 1 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 1, location: undefined },
    ],
    checkoutMethod: CheckoutMethod.BOOK_NOW,
  },
  {
    id: '5',
    image: SecondBoatImage,
    alt: 'Ski Boat Image',
    imagesDetail: [
      { src: YatchImage, alt: 'Yatch Image', id: 1 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 2 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
    ],
    title: 'Ski Boat P',
    tagline: 'The second fastest boat we have!',
    description: {
      text: 'The second fastest boat we have! Don’t miss it, you will have a great time at sea.',
      maxChars: 135,
    },
    isUnavailable: false,
    calendarInfo: CALENDAR_INFO_1,
    dateRange: {
      start: baseDate,
      end: addDays(baseDate, 1),
    },
    otherDates: [
      {
        dateRange: {
          start: addMonths(baseDate, 4),
          end: addDays(addMonths(baseDate, 4), 1),
        },
        id: 1,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 5),
          end: addDays(addMonths(baseDate, 5), 1),
        },
        id: 2,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 6),
          end: addDays(addMonths(baseDate, 6), 1),
        },
        id: 3,
      },
    ],
    amenities: [
      { id: 1, icon: SupportedIconsEnum.PEOPLE, text: '7 people' },
      { id: 2, icon: SupportedIconsEnum.MAXIMIZE, text: '24 ft' },
      { id: 3, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 4, icon: SupportedIconsEnum.CAT, text: 'Yes' },
    ],
    topSectionComponent: CardComponentOption.AMENITIES,
    bottomSectionComponent: CardComponentOption.DESCRIPTION,
    limits: { max: 100, min: 0 },
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    defaultAccessories: [
      { id: '1', quantity: 1 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 1, location: undefined },
    ],
    checkoutMethod: CheckoutMethod.ADD_TO_CART,
    policies: POLICIES_DESCRIPTION,
  },
  {
    id: '6',
    image: YatchImage,
    alt: 'Ski Boat Image',
    imagesDetail: [
      { src: YatchImage, alt: 'Yatch Image', id: 1 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 2 },
      { src: YatchImage, alt: 'Yatch Image', id: 3 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 4 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 5 },
      { src: YatchImage, alt: 'Yatch Image', id: 6 },
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 7 },
    ],
    title: 'Ski Boat P',
    tagline: 'The second fastest boat we have!',
    description: {
      text: 'The second fastest boat we have! Don’t miss it, you will have a great time at sea.',
      maxChars: 135,
    },
    isUnavailable: false,
    calendarInfo: CALENDAR_INFO_1,
    dateRange: {
      start: baseDate,
      end: addDays(baseDate, 1),
    },
    otherDates: [
      {
        dateRange: {
          start: addMonths(baseDate, 4),
          end: addDays(addMonths(baseDate, 4), 1),
        },
        id: 1,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 5),
          end: addDays(addMonths(baseDate, 5), 1),
        },
        id: 2,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 6),
          end: addDays(addMonths(baseDate, 6), 1),
        },
        id: 3,
      },
    ],
    amenities: [
      { id: 1, icon: SupportedIconsEnum.PEOPLE, text: '7 people' },
      { id: 2, icon: SupportedIconsEnum.MAXIMIZE, text: '24 ft' },
      { id: 3, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 4, icon: SupportedIconsEnum.CAT, text: 'Yes' },
    ],
    topSectionComponent: CardComponentOption.AMENITIES,
    bottomSectionComponent: CardComponentOption.DESCRIPTION,
    limits: { max: 100, min: 0 },
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    defaultAccessories: [
      { id: '1', quantity: 1 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 1, location: undefined },
    ],
    checkoutMethod: CheckoutMethod.ADD_TO_CART,
    policies: POLICIES_DESCRIPTION,
  },
  {
    id: '7',
    image: LuxuryBoatImage,
    alt: 'Ski Boat Image',
    imagesDetail: [
      { src: LuxuryBoatImage, alt: 'Luxury Boat Image', id: 1 },
      { src: YatchImage, alt: 'Yatch Image', id: 2 },
      { src: LuxuryBoat2Image, alt: 'Big Boat Image', id: 3 },
    ],
    title: 'Ski Boat P',
    tagline: 'The second fastest boat we have!',
    description: {
      text: 'The second fastest boat we have! Don’t miss it!',
      maxChars: 135,
    },
    isUnavailable: false,
    calendarInfo: CALENDAR_INFO_1,
    dateRange: {
      start: baseDate,
      end: addDays(baseDate, 1),
    },
    otherDates: [
      {
        dateRange: {
          start: addMonths(baseDate, 4),
          end: addDays(addMonths(baseDate, 4), 1),
        },
        id: 1,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 5),
          end: addDays(addMonths(baseDate, 5), 1),
        },
        id: 2,
      },
      {
        dateRange: {
          start: addMonths(baseDate, 6),
          end: addDays(addMonths(baseDate, 6), 1),
        },
        id: 3,
      },
    ],
    amenities: [
      { id: 1, icon: SupportedIconsEnum.PEOPLE, text: '7 people' },
      { id: 3, icon: SupportedIconsEnum.VELOCITY, text: '24 ft' },
      { id: 4, icon: SupportedIconsEnum.CAT, text: 'Yes' },
    ],
    topSectionComponent: CardComponentOption.AMENITIES,
    bottomSectionComponent: CardComponentOption.DESCRIPTION,
    limits: { max: 100, min: 0 },
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    defaultAccessories: [
      { id: '1', quantity: 1 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 1, location: undefined },
    ],
    checkoutMethod: CheckoutMethod.ADD_TO_CART,
    policies: POLICIES_DESCRIPTION,
  },
];
