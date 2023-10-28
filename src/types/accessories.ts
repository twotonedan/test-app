import { TagColor } from './enums';
import { IImage, IQuantityLimits } from './common';

export interface ILocation {
  id: string;
  key: string;
  name: string;
  address: string;
  price: number;
}

export interface IAccessory {
  id: string;
  tag: {
    label: string;
    color: TagColor;
  };
  imagesDetail: IImage[];
  alt: string;
  title: string;
  subTitle: string;
  description: string;
  limits: IQuantityLimits;
  price: number;
  locations?: Array<ILocation>;
}
