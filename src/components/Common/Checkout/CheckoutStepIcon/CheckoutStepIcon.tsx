import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, StepIconProps, css, styled } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledStepIcon = styled(Box, transientOptions)<{ $active?: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid ${theme.palette.action.disabled};
  border-radius: 999px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${theme.palette.action.disabled};
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  ${({ $active }) =>
    $active &&
    css`
      border: 1px solid ${theme.palette.primary.main};
      color: ${theme.palette.primary.main};
    `}
`;

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  color: ${theme.palette.primary.main};
`;

const CheckoutStepIcon = ({ icon, active, completed }: StepIconProps) =>
  completed ? <StyledCheckCircleIcon /> : <StyledStepIcon $active={active}>{icon}</StyledStepIcon>;

export default CheckoutStepIcon;
