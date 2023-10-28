import { PageType } from '@/types/enums';

export type RoutesPayload = {
  [key in PageType]: string;
};

const ROUTES: RoutesPayload = {
  [PageType.INDEX]: '/',
  [PageType.DOCK_QUEUE]: '/dock-queue',
  [PageType.ITEM_DETAIL]: '/details/:id',
  [PageType.CHECKOUT]: '/checkout',
  [PageType.MY_RESERVATIONS]: '/my-reservations',
};

export default ROUTES;
