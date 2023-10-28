import { Box, styled } from '@mui/material';
import useInputError from '@/hooks/useInputError';
import { useFormContext } from 'react-hook-form';
import theme from '@/theme/theme';
import CheckboxComponent from '../Checkbox/Checkbox';
import InputHelper from '../InputHelper';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledCheckbox = styled(CheckboxComponent)`
  width: 100%;

  .focused {
    background-color: ${theme.palette.customColors.gray};
  }
`;

type Props = {
  label: string;
  baseName: string;
  isRequired?: boolean;
};

const SingleCheck = ({ baseName, label, isRequired }: Props) => {
  const error = useInputError(baseName);
  const { trigger } = useFormContext();

  return (
    <StyledWrapper>
      <StyledCheckbox label={label} name={baseName} size='small' onClick={() => trigger(baseName)} />
      <InputHelper error={error} isRequired={isRequired} addMargin />
    </StyledWrapper>
  );
};

export default SingleCheck;
