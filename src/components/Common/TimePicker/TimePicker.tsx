import { ComponentPropsWithoutRef, useCallback, useId, useMemo } from 'react';
import { Box, styled } from '@mui/material';
import { noop } from 'lodash';
import NiceModal from '@ebay/nice-modal-react';
import TimeInput from './TimeInput';
import TimeModal from './TimeModal';

const StyledWrapper = styled(Box)`
  display: flex;
  column-gap: 8px;
`;

type Props = {
  name: string;
  label: string;
  isRequired?: boolean;
};

const TimePicker = ({ name, label, isRequired }: Props) => {
  const timeId = useId();
  const timeModalId = `time-modal-${timeId}`;
  const handleOpenModal = useCallback(() => NiceModal.show(timeModalId), [timeModalId]);
  const handleCloseModal = useCallback(() => NiceModal.hide(timeModalId), [timeModalId]);

  type TimeInputsPickerProps = Omit<ComponentPropsWithoutRef<typeof TimeInput>, 'name'>;

  const dateProps: TimeInputsPickerProps = useMemo(
    () => ({
      readOnly: true,
      InputProps: { onClick: handleOpenModal, onFocus: noop },
      isRequired,
    }),
    [handleOpenModal, isRequired]
  );

  return (
    <StyledWrapper>
      <TimeInput name={name} label={label} disableOpenPicker {...dateProps} />
      <TimeModal inputLabel={label} formName={name} id={timeModalId} onClickBack={() => handleCloseModal()} />
    </StyledWrapper>
  );
};

export default TimePicker;
