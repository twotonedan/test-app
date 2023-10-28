import { IDeleteProps } from '@/hooks/api/useDeleteDockQueueView';

export type IFormatProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  row: any;
};
export type IComparator = 'string' | 'date' | 'options';
export type IColumn = {
  field: string;
  headerName: string;
  formatter?: ({ value, row }: IFormatProps) => string | JSX.Element;
  pinned?: boolean;
  example?: string;
  show?: boolean;
  comparator: IComparator;
  options?: { id: string; title: string }[];
};
export type IActionProps = {
  id: string;
  name: string;
  show: boolean;
};
export type IModalType = 'add' | 'edit' | 'duplicate';
export type ISortDirectionType = 'asc' | 'desc';
export type IViewFormValues = {
  id?: string;
  name: string;
  isPrivate: boolean;
  columns: IColumn[];
  actions: IActionProps[];
  sortField: string;
  sortOrder: ISortDirectionType;
};
export type IViewModalProps = {
  data: IViewFormValues;
  modalType: IModalType;
  isCardView: boolean;
  deleteView: (props: IDeleteProps, options: { onSuccess: () => void }) => void;
  createView: (props: { formValues: IViewFormValues; isCardView: boolean }, options: { onSuccess: () => void }) => void;
};
type IBookingItem = {
  id: string;
  title: string;
};
export type IBookingAccessory = {
  id: string;
  title: string;
  quantity: number;
  tag?: string;
  rate: number;
  isSelected?: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IBooking extends Record<string, any> {
  id: string;
  customerName: string;
  bookingId: string;
  item: IBookingItem;
  customerNote: string;
  accessories: IBookingAccessory[];
  launch: Date;
  return: Date;
  charges: ICharge[] | [];
}

export type IBookingFilter = {
  field: string;
  value?: IBookingItem[];
  contains?: string;
  before?: string;
  after?: string;
};

export type ICardView = {
  id: string;
  name: string;
  subName: string;
  tag?: string;
  isCustomView?: boolean;
  isPrivate: boolean;
  sortField: string;
  sortOrder: ISortDirectionType;
  columns: IColumn[];
  actions: IActionProps[];
  userIsOwner: boolean;
  isDefault: boolean;
};
export enum SortDirections {
  ASC = 'asc',
  DESC = 'desc',
}
export type IListFilter = {
  sortField: string;
  sortOrder: ISortDirectionType;
  setSortOrder: (sortOrder: ISortDirectionType) => void;
  setSortField: (sortField: string) => void;
  fields: IColumn[];
  setFilterFields: (fields: IBookingFilter[] | []) => void;
  filterFields: IBookingFilter[];
  savedFilters: IBookingFilter[];
};
export type IFilterModalProps = {
  data: IListFilter;
};
export type ICharge = {
  id: string;
  name: string;
  value: number;
  isCurrency?: boolean;
  required?: boolean;
  rate?: number;
  units?: string;
};
export type IStepperConfig = {
  steps: {
    id: string;
    title: string;
    content: JSX.Element;
  }[];
  data: any;
};
