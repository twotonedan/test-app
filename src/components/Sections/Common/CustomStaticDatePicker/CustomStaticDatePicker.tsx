import { DateRangeInputsPickerProps } from '@/components/Common/DateRangeInputs/DateRangeInputs';
import { Box, styled } from '@mui/material';
import { noop } from 'lodash';
import { useCallback, useMemo, memo, useId } from 'react';
import DatePickerInput from '@/components/Common/DatePickerInput';
import NiceModal from '@ebay/nice-modal-react';

import CustomStaticDateDrawer from './CustomStaticDateModal';

const StyledWrapper = styled(Box)`
  display: flex;
  column-gap: 8px;
`;

type Props = {
  name: string;
  className?: string;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
  label: string;
  isRequired?: boolean;
};

const CustomStaticDatePicker = ({ name, className, disableFuture, label, minDate, maxDate, isRequired }: Props) => {
  const modalId = useId();
  const customModalId = `custom-modal-${modalId}`;
  const handleOpenModal = useCallback(() => NiceModal.show(customModalId), [customModalId]);
  const handleCloseModal = useCallback(() => NiceModal.hide(customModalId), [customModalId]);

  const dateProps: DateRangeInputsPickerProps = useMemo(
    () => ({
      readOnly: true,
      InputProps: { onClick: handleOpenModal, onFocus: noop },
      isRequired,
    }),
    [handleOpenModal, isRequired]
  );

  return (
    <StyledWrapper component='section' className={className}>
      <DatePickerInput name={name} validateFields={name} label={label} disableOpenPicker {...dateProps} />
      <CustomStaticDateDrawer
        id={customModalId}
        name={name}
        onClickBack={handleCloseModal}
        onClickSave={handleCloseModal}
        disableFuture={disableFuture}
        minDate={minDate}
        maxDate={maxDate}
      />
    </StyledWrapper>
  );
};

export default memo(CustomStaticDatePicker);
