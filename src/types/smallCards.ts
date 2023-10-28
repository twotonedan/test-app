import { StaticImageData } from 'next/image';
import { TagColor } from './enums';
import { IQuantityLimits } from './common';

export interface ISmallCard {
  id: string;
  tag: {
    label: string;
    color: TagColor;
  };
  image: StaticImageData;
  alt: string;
  title: string;
  subTitle: string;
  quantityLimits: IQuantityLimits;
}
