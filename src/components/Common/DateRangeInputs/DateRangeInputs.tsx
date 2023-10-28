import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'next-i18next';
import DatePicker from '../DatePickerInput';

const StyledInputsWrapper = styled(Box)`
  display: flex;
  grid-gap: 8px;
`;

export type DateRangeInputsPickerProps = Omit<ComponentPropsWithoutRef<typeof DatePicker>, 'name'>;

type Props = {
  className?: string;
  name: string;
  start?: DateRangeInputsPickerProps;
  end?: DateRangeInputsPickerProps;
};

const DateRangeInputs = ({ className, name, start, end }: Props) => {
  const { t } = useTranslation('common');

  const startName = `${name}.start`;
  const endName = `${name}.end`;

  return (
    <StyledInputsWrapper className={className}>
      <DatePicker
        label={t('date.dateRange.start')}
        name={startName}
        validateFields={[startName, endName]}
        disableOpenPicker
        {...start}
      />
      <DatePicker
        label={t('date.dateRange.end')}
        name={endName}
        validateFields={[startName, endName]}
        disableOpenPicker
        {...end}
      />
    </StyledInputsWrapper>
  );
};

export default DateRangeInputs;
