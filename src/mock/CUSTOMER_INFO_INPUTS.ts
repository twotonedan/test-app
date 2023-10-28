import { InputType, SupportedIconsEnum } from '@/types/enums';
import { toUTC } from '@/utils/timezone';
import { sub } from 'date-fns';

export type ICustomerInfoInputs = {
  id: string;
  label: string;
  type: InputType;
  formName: string;
  isMandatory: boolean;
  options?: { label: string; value: string | number; id: number }[];
  minDate?: Date;
  maxDate?: Date;
  icon?: SupportedIconsEnum;
  isFullWidth?: boolean;
};

export type ICustomerInfoInputsPayload = {
  title: string;
  id: string;
  data: ICustomerInfoInputs[];
};

const baseDate = toUTC(new Date());

export const CUSTOMER_INFO_INPUTS: ICustomerInfoInputsPayload[] = [
  {
    title: 'Personal Data',
    id: 'personalData',
    data: [
      {
        label: 'Email Adress',
        formName: 'email',
        type: InputType.EMAIL,
        isMandatory: true,
        id: 'email',
        icon: SupportedIconsEnum.EMAIL_OUTLINED,
      },
      {
        label: 'First Name',
        formName: 'firstName',
        type: InputType.STRING,
        isMandatory: true,
        icon: SupportedIconsEnum.ACCOUNT_CIRCLE_OUTLINED,
        id: 'firstName',
      },
      {
        label: 'Phone Number',
        formName: 'phoneNumber',
        type: InputType.PHONE,
        isMandatory: true,
        id: 'phoneNumber',
        icon: SupportedIconsEnum.PHONE_ANDROID_OUTLINED,
      },
      {
        label: 'Birth Date',
        formName: 'birthDate',
        type: InputType.DATE,
        isMandatory: true,
        id: 'birthDate',
        minDate: sub(baseDate, { years: 100 }),
        maxDate: sub(baseDate, { years: 18 }),
        icon: SupportedIconsEnum.CALENDAR_TODAY_OUTLINED,
      },
      {
        label: 'Age',
        formName: 'age',
        type: InputType.NUMBER,
        isMandatory: true,
        id: 'age',
        isFullWidth: true,
      },
      {
        label: 'Favorite color 1',
        formName: 'favoriteColorSelect',
        type: InputType.SELECT,
        isMandatory: true,
        id: 'favoriteColorSelect',
        options: [
          { label: 'Red', value: 'red', id: 1 },
          { label: 'Blue', value: 'blue', id: 2 },
        ],
        isFullWidth: true,
      },
      {
        label: 'Favorite color 2',
        formName: 'favoriteColorCheck',
        type: InputType.CHECKBOX,
        isMandatory: true,
        id: 'favoriteColorCheck',
        options: [
          { label: 'Red', value: 'red', id: 1 },
          { label: 'Blue', value: 'blue', id: 2 },
        ],
        isFullWidth: true,
      },
      {
        label: 'Favorite color 3',
        formName: 'favoriteColorRadio',
        type: InputType.RADIO,
        isMandatory: true,
        id: 'favoriteColorRadio',
        options: [
          { label: 'Red', value: 'red', id: 1 },
          { label: 'Blue', value: 'blue', id: 2 },
        ],
        isFullWidth: true,
      },
      {
        label: 'Approves additional information',
        formName: 'approves',
        type: InputType.SINGLECHECK,
        isMandatory: true,
        id: 'approves',
        isFullWidth: true,
      },
      {
        label: 'Best time',
        formName: 'bestTime',
        type: InputType.TIME,
        isMandatory: true,
        id: 'bestTime',
        isFullWidth: true,
      },
    ],
  },
  {
    title: 'Additional Information',
    id: 'additionalInformation',
    data: [
      {
        label: 'First Name',
        formName: 'firstName',
        type: InputType.STRING,
        isMandatory: false,
        id: 'firstNames',
      },
      {
        label: 'Email Adress',
        formName: 'email',
        type: InputType.EMAIL,
        isMandatory: false,
        id: 'emails',
      },
      {
        label: 'Phone Number',
        formName: 'phoneNumber',
        type: InputType.PHONE,
        isMandatory: false,
        id: 'phoneNumbers',
      },
      {
        label: 'Birth Date',
        formName: 'birthDate',
        type: InputType.DATE,
        isMandatory: false,
        id: 'birthDatea',
        minDate: sub(baseDate, { years: 100 }),
        maxDate: sub(baseDate, { years: 18 }),
      },
      {
        label: 'Age',
        formName: 'age',
        type: InputType.NUMBER,
        isMandatory: false,
        id: 'ages',
      },
      {
        label: 'Favorite color 1',
        formName: 'favoriteColorSelect',
        type: InputType.SELECT,
        isMandatory: false,
        id: 'favoriteColorSelects',
        options: [
          { label: 'Red', value: 'red', id: 1 },
          { label: 'Blue', value: 'blue', id: 2 },
        ],
      },
      {
        label: 'Favorite color 2',
        formName: 'favoriteColorCheck',
        type: InputType.CHECKBOX,
        isMandatory: false,
        id: 'favoriteColorChecks',
        options: [
          { label: 'Red', value: 'red', id: 1 },
          { label: 'Blue', value: 'blue', id: 2 },
        ],
      },
      {
        label: 'Favorite color 3',
        formName: 'favoriteColorRadio',
        type: InputType.RADIO,
        isMandatory: false,
        id: 'favoriteColorRadios',
        options: [
          { label: 'Red', value: 'red', id: 1 },
          { label: 'Blue', value: 'blue', id: 2 },
        ],
      },
      {
        label: 'Approves additional information',
        formName: 'approves',
        type: InputType.SINGLECHECK,
        isMandatory: false,
        id: 'approvess',
      },
      { label: 'Best time', formName: 'bestTime', type: InputType.TIME, isMandatory: false, id: 'bestTimes' },
    ],
  },
];
