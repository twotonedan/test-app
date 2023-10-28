import { viewListStatusIndicator } from '@/types/viewListElement';
import { REUSABLE_CARDS } from './REUSABLE_CARDS';

export const VIEW_LIST_CARD_ITEMS = [
  {
    id: '1',
    name: 'first-view-list-element',
    subName: 'Tom Green',
    button: {
      buttonType: viewListStatusIndicator.private,
    },
    cardData: REUSABLE_CARDS[0],
    userIsOwner: true,
  },
  {
    id: '2',
    name: 'second-view-list-element',
    subName: 'Tom Green',
    button: {
      buttonType: viewListStatusIndicator.default,
    },
    cardData: REUSABLE_CARDS[1],
    userIsOwner: false,
  },
  {
    id: '3',
    name: 'third-view-list-element',
    subName: 'Tom Green',
    button: {
      buttonType: viewListStatusIndicator.standard,
    },
    cardData: REUSABLE_CARDS[2],
    userIsOwner: false,
  },
  {
    id: '4',
    name: 'fourth-view-list-element',
    subName: 'Tom Green',
    userIsOwner: true,
  },
];
