import styled from '@emotion/styled';
import { Button } from '@mui/material';

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
`;

interface Props {
  buttonLabel: string;
  onClickHandler?: () => void;
  variant?: 'outlined' | 'contained';
  href?: string;
}

const ReusableButton = ({ variant = 'contained', buttonLabel, onClickHandler, href }: Props) => {
  return (
    <StyledButton href={href} variant={variant} fullWidth onClick={onClickHandler}>
      {buttonLabel}
    </StyledButton>
  );
};

export default ReusableButton;
