import theme from '@/theme/theme';
import { Box, ListItem, Typography, css, styled } from '@mui/material';
import { ReactElement, useMemo } from 'react';
import { transientOptions } from '@/utils/transientOptions';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { IUserDataValues } from '@/mock/USER_DATA';
import { InputType, SupportedIconsEnum } from '@/types/enums';
import { mapValues, omit } from 'lodash';
import { SupportedIcons } from '@/constants/icons/supportedIcons';
import useIntlFormat, { IntlFormatOptions } from '@/hooks/formatters/useIntlFormat';
import { parseISO } from 'date-fns';
// @ts-ignore-next-line
import gPhoneNumber from 'google-libphonenumber';

const phoneUtil = gPhoneNumber.PhoneNumberUtil.getInstance();

const StyledWrapper = styled(ListItem, transientOptions)<{ $showInColumn: boolean }>`
  display: flex;
  align-items: center;
  padding: 0;
  width: unset;

  ${({ $showInColumn }) =>
    !$showInColumn
      ? css`
          :not(:last-of-type)::after {
            content: '';
            height: 20px;
            width: 1px;
            background-color: ${theme.palette.customColors.gray};
            margin-left: 8px;
            margin-right: 8px;
          }
        `
      : css`
          width: 100%;
        `}
`;

const StyledTextContainer = styled(Box)`
  margin-left: 4px;
  display: flex;
  gap: 4px;
`;

type StringInputTypes = Exclude<
  InputType,
  InputType.DATE | InputType.CHECKBOX | InputType.SINGLECHECK | InputType.PHONE
>;

const stringInputTypes = omit(InputType, [
  InputType.DATE,
  InputType.CHECKBOX,
  InputType.SINGLECHECK,
]) as unknown as StringInputTypes;

type Parsers<T extends InputType> = {
  [k in T]: (value: IUserDataValues[k]) => {
    value: string | null;
    icon: ReactElement | null;
  };
};

const stringValueParsers: Parsers<StringInputTypes> = mapValues(
  stringInputTypes,
  (k: StringInputTypes) =>
    <K extends string | number = IUserDataValues[typeof k]>(v: K) => ({
      value: v.toString(),
      icon: null,
    })
) as unknown as Parsers<StringInputTypes>;

const dateFormatOptions: IntlFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
const valueParsers = (
  intlFormat: ReturnType<typeof useIntlFormat>['intlFormat']
): Parsers<Exclude<InputType, StringInputTypes>> => ({
  [InputType.PHONE]: v => {
    let phoneNumber: gPhoneNumber.PhoneNumber | null;

    try {
      phoneNumber = phoneUtil.parseAndKeepRawInput(v);
    } catch (_) {
      phoneNumber = null;
    }

    return {
      value: phoneNumber ? phoneUtil.formatInOriginalFormat(phoneNumber) : '<Invalid phone number>',
      icon: null,
    };
  },
  [InputType.DATE]: v => ({ value: intlFormat(parseISO(v), dateFormatOptions), icon: null }),
  [InputType.CHECKBOX]: v => ({ value: v.map(vItem => vItem.value).join(', '), icon: null }),
  [InputType.SINGLECHECK]: v => ({
    value: null,
    icon: v ? <CheckOutlinedIcon fontSize='small' /> : <CloseOutlinedIcon fontSize='small' />,
  }),
});

type Props<T extends InputType> = {
  label?: string;
  value: IUserDataValues[T];
  icon?: SupportedIconsEnum;
  showInColumn: boolean;
  type: T;
};

const ReadOnlyComponent = <T extends InputType>({ showInColumn, label, type, icon, value }: Props<T>) => {
  const { intlFormat } = useIntlFormat();

  const inputValueParser = useMemo<Parsers<InputType>>(
    () => ({
      ...stringValueParsers,
      ...valueParsers(intlFormat),
    }),
    [intlFormat]
  );

  const { icon: parsedIcon, value: parsedValue } = useMemo(
    () => inputValueParser[type](value),
    [inputValueParser, type, value]
  );
  const showLabel = label && !icon;

  const IconComponent = icon ? SupportedIcons[icon] : null;

  return (
    <StyledWrapper $showInColumn={showInColumn}>
      {parsedIcon ?? (IconComponent ? <IconComponent fontSize='small' /> : null)}
      <StyledTextContainer>
        <Typography variant='h4' fontWeight={!parsedValue ? 400 : 600}>
          {showLabel && `${label}${parsedValue ? ':' : ''}`}
        </Typography>
        <Typography variant='h4'> {parsedValue}</Typography>
      </StyledTextContainer>
    </StyledWrapper>
  );
};

export default ReadOnlyComponent;
