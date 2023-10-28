import { InputType } from '@/types/enums';
import { ValueOf } from '@/types/utils';

export type IArrayData = {
  value: string | number;
};

export type IUserDataValues = {
  [InputType.DATE]: string;
  [InputType.EMAIL]: string;
  [InputType.STRING]: string;
  [InputType.PHONE]: string;
  [InputType.NUMBER]: number;
  [InputType.SELECT]: string;
  [InputType.CHECKBOX]: IArrayData[];
  [InputType.RADIO]: string;
  [InputType.SINGLECHECK]: boolean;
  [InputType.TIME]: string;
};

export type IUserData<T extends InputType> = {
  id: string;
  type: T;
  value: IUserDataValues[T];
};

type AllAvailableUserData = {
  [K in InputType]: IUserData<K>;
};

export type IUserDataGroup = {
  id: string;
  data: ValueOf<AllAvailableUserData>[];
};

export type IUserPayload = {
  id: string;
  credits: number;
  data: IUserDataGroup[];
  stripeCustomerId: string;
};

const USER_DATA: IUserPayload = {
  id: '1',
  stripeCustomerId: 'cus_OFdPxoUKb5DYpB',
  credits: 3456.83,
  data: [
    {
      id: 'personalData',
      data: [
        { id: 'email', type: InputType.EMAIL, value: 'johnsmith@gmail.com' },
        {
          id: 'firstName',
          type: InputType.STRING,

          value: 'John Smith',
        },
        {
          id: 'phoneNumber',
          type: InputType.PHONE,

          value: '+919876543210',
        },
        {
          id: 'birthDate',
          value: '1970-05-04T10:10:20.000Z',
          type: InputType.DATE,
        },
        { id: 'age', type: InputType.NUMBER, value: 77 },
        { id: 'favoriteColorSelect', type: InputType.SELECT, value: 'red' },
        { id: 'favoriteColorCheck', type: InputType.CHECKBOX, value: [{ value: 'red' }, { value: 'blue' }] },
        { id: 'favoriteColorRadio', type: InputType.RADIO, value: 'red' },
        { id: 'approves', type: InputType.SINGLECHECK, value: true },
        { id: 'bestTime', type: InputType.TIME, value: '' },
      ],
    },
    {
      id: 'additionalInformation',
      data: [
        {
          id: 'firstNames',
          type: InputType.STRING,
          value: 'John Smith',
        },
        { id: 'emails', type: InputType.EMAIL, value: 'johnsmith@gmail.com' },
        {
          id: 'phoneNumbers',
          type: InputType.PHONE,
          value: '+919876543210',
        },
        {
          id: 'birthDatea',
          value: '',
          type: InputType.DATE,
        },
        { id: 'ages', type: InputType.NUMBER, value: 77 },
        { id: 'favoriteColorSelects', type: InputType.SELECT, value: 'red' },
        { id: 'favoriteColorChecks', type: InputType.CHECKBOX, value: [{ value: 'red' }, { value: 'blue' }] },
        { id: 'favoriteColorRadios', type: InputType.RADIO, value: '' },
        { id: 'approvess', type: InputType.SINGLECHECK, value: true },
        { id: 'bestTimes', type: InputType.TIME, value: '' },
      ],
    },
  ],
};

export default USER_DATA;
