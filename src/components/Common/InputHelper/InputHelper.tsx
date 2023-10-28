import { FormHelperText, styled } from '@mui/material';
import { useMemo } from 'react';
import { transientOptions } from '@/utils/transientOptions';
import RequiredLabel from './RequiredLabel';

type Props = {
  error?: string;
  isRequired?: boolean;
  helperText?: string;
  addMargin?: boolean;
};

const StyledFormHelperText = styled(FormHelperText, transientOptions)<{ $addMargin?: boolean }>`
  word-wrap: break-word;
  margin-left: ${props => (props.$addMargin ? '14px' : '0')};
`;

const InputHelper = ({ error, isRequired, helperText, addMargin }: Props) => {
  const hasNoContent = useMemo(() => !error && !isRequired && !helperText, [error, isRequired, helperText]);

  if (hasNoContent) return null;
  return (
    <StyledFormHelperText error={!!error} $addMargin={addMargin} as='span'>
      {error || (isRequired && <RequiredLabel />) || helperText}
    </StyledFormHelperText>
  );
};

export default InputHelper;
