import { PageType } from './enums';

export interface IFooterList<T extends LinkType = LinkType> {
  title: string;
  list?: IFooterItem<T>[];
}

export enum LinkType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

export interface IFooterItem<T extends LinkType, K = T extends LinkType.INTERNAL ? PageType : string> {
  type: T;
  title: string;
  link: K;
}
