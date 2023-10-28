import { ReusableCardType } from './reusableCards';

export interface ViewListElement {
  id: string;
  name: string;
  subName: string;
  tag?: string;
  isCustomView?: boolean;
  cardData?: ReusableCardType;
  userIsOwner: boolean;
}

export const viewListStatusIndicator = {
  private: 'private',
  default: 'default',
  standard: 'standard',
  mandatory: 'mandatory',
};
