import { useMemo } from 'react';
import { noop } from 'lodash';
import { useTranslation } from 'next-i18next';
import { Box, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';
import { DateRangeInputsPickerProps } from '@/components/Common/DateRangeInputs/DateRangeInputs';
import SingleMultiDatePickers from '@/components/Common/SingleMultiDatePickers/SingleMultiDatePickers';
import Input from '@/components/Common/Input';
import { DatePickerInputProps } from '@/components/Common/DatePickerInput/DatePickerInput';
import { BookingInformationType } from '@/types/enums';
import BookingComponent from '@/components/Common/BookingComponent';

const StyledInputsWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 38px;

  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }
`;

const StyledInput = styled(Input)`
  ${theme.breakpoints.up('md')} {
    width: 48%;
  }
`;

const StyledFormWrapper = styled(Box)`
  ${theme.mixins.layout};
  margin-top: 16px;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledTitle = styled(Typography)`
  padding-bottom: 8px;
`;

const StyledDateAndTimeWrapper = styled(Box)`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const StyledContactInfoWrapper = styled(Box)``;

const StyledContactTitle = styled(Typography)`
  margin: 24px 0;
`;

type Props = {
  isSingleDate: boolean;
  bookingInformationFormat: BookingInformationType;
};

export const JoinWaitlistForm = ({ isSingleDate, bookingInformationFormat }: Props) => {
  const { t } = useTranslation(['common']);
  const name = 'bookingInformation';
  const fieldsToValidate = [`${name}.timeRange`, `${name}.dateRange`, `${name}.date`];

  const bookingInformationFields = [
    'bookingInformation.dateRange',
    'bookingInformation.date',
    'bookingInformation.timeRange',
  ];

  const dateProps: DateRangeInputsPickerProps = useMemo(
    () => ({
      readOnly: false,
      InputProps: { onFocus: noop },
    }),
    []
  );

  return (
    <StyledFormWrapper>
      <StyledTitle variant='h3' fontWeight={600}>
        {t('common:datePreferences')}
      </StyledTitle>
      <StyledDateAndTimeWrapper>
        <SingleMultiDatePickers
          name={name}
          isMultiDay={!isSingleDate}
          start={dateProps}
          end={dateProps}
          singleDate={dateProps as DatePickerInputProps}
        />
        <BookingComponent
          type={bookingInformationFormat}
          name={`${name}.timeRange`}
          validateFields={fieldsToValidate}
        />
      </StyledDateAndTimeWrapper>
      <StyledContactInfoWrapper>
        <StyledContactTitle variant='h3' fontWeight={600}>
          {t('common:contactInfo')}
        </StyledContactTitle>
        <StyledInputsWrapper>
          <StyledInput
            name='email'
            fullWidth
            label={t('common:email')}
            isRequired
            validateFields={['email', ...bookingInformationFields]}
          />
          <StyledInput
            name='firstName'
            fullWidth
            label={t('common:firstName')}
            isRequired
            validateFields={['firstName', ...bookingInformationFields]}
          />
          <StyledInput
            name='lastName'
            fullWidth
            label={t('common:lastName')}
            isRequired
            validateFields={['lastName', ...bookingInformationFields]}
          />
          <StyledInput
            name='phoneNumber'
            fullWidth
            label={t('common:phoneNumber')}
            isRequired
            validateFields={['phoneNumber', ...bookingInformationFields]}
          />
        </StyledInputsWrapper>
      </StyledContactInfoWrapper>
    </StyledFormWrapper>
  );
};
