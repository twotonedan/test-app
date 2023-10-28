import { BoatImage, LuxuryBoat2Image, SecondBoatImage } from '@/assets/images';
import { IAccessory } from '@/types/accessories';
import { PredefinedCardTags, TagColor } from '@/types/enums';
import { LOCATIONS_DATA } from './LOCATIONS_DATA';

export type AccessoriesPayload = IAccessory[];

export const ACCESSORIES_ITEMS: AccessoriesPayload = [
  {
    id: '1',
    tag: { label: PredefinedCardTags.MANDATORY, color: TagColor.RED },
    imagesDetail: [
      {
        src: SecondBoatImage,
        alt: 'Second Boat Image',
        id: 1,
      },
    ],
    title: 'Boat Insurance',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    alt: 'Yatch Image',
    limits: { min: 1, max: 5 },
    price: 50,
  },
  {
    id: '2',
    tag: { label: PredefinedCardTags.MANDATORY, color: TagColor.RED },
    imagesDetail: [
      { src: LuxuryBoat2Image, alt: 'Luxury Boat 2 Image', id: 1 },
      { src: BoatImage, alt: 'Boat Image', id: 2 },
      { src: SecondBoatImage, alt: 'Second Boat Image', id: 3 },
    ],
    title: 'Lifejacket',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    alt: 'Boat Image',
    limits: { min: 1, max: 8 },
    price: 100,
  },
  {
    id: '3',
    tag: { label: PredefinedCardTags.MANDATORY, color: TagColor.RED },
    imagesDetail: [
      {
        src: SecondBoatImage,
        alt: 'Second Boat Image',
        id: 1,
      },
    ],
    alt: 'Lifejacket',
    title: 'Ski Boat',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    limits: { min: 1, max: 1 },
    price: 60,
    locations: LOCATIONS_DATA,
  },
  {
    id: '4',
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    imagesDetail: [{ src: SecondBoatImage, alt: 'Second Boat Image', id: 1 }],
    title: 'Lifejacket',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    alt: 'Boat Image',
    limits: { min: 0, max: 1 },
    price: 20,
    locations: LOCATIONS_DATA,
  },
  {
    id: '5',
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    imagesDetail: [{ src: SecondBoatImage, alt: 'Second Boat Image', id: 1 }],
    alt: 'Lifejacket',
    title: 'Ski Boat',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    limits: { min: 0, max: 5 },
    price: 140,
  },
  {
    id: '6',
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    imagesDetail: [{ src: SecondBoatImage, alt: 'Second Boat Image', id: 1 }],
    title: 'Lifejacket',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    alt: 'Boat Image',
    limits: { min: 0, max: 100 },
    price: 80,
  },
  {
    id: '7',
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    imagesDetail: [{ src: SecondBoatImage, alt: 'Second Boat Image', id: 1 }],
    alt: 'Lifejacket',
    title: 'Ski Boat',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    limits: { min: 0, max: 5 },
    price: 150,
  },
  {
    id: '8',
    tag: { label: PredefinedCardTags.RECOMMENDED, color: TagColor.LIGHTBLUE },
    imagesDetail: [{ src: SecondBoatImage, alt: 'Second Boat Image', id: 1 }],
    title: 'Lifejacket',
    subTitle: '$24.00/hour',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quismagna norunostru.',
    alt: 'Boat Image',
    limits: { min: 0, max: 100 },
    price: 100,
  },
];
