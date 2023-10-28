import theme from '@/theme';
import { Fab, styled, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const StyledFloatingButton = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  column-gap: 0.5em;
  text-transform: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${theme.palette.customColors.strongGreen};
  padding: 14px 24px;
  border-radius: 200px;
  width: auto;
  &:hover {
    background: ${theme.palette.customColors.strongGreen};
  }
`;

export interface AddButtonConfig {
  onClick: () => void;
  label: string;
}

type Props = {
  addButtonConfig: AddButtonConfig;
};

const FloatingFixedBottomRightButton = ({ addButtonConfig }: Props) => {
  return (
    <StyledFloatingButton
      data-testid='floatingFixedBottomRightButton'
      aria-label='View'
      onClick={addButtonConfig?.onClick}>
      <AddIcon fontSize='small' sx={{ mt: '3px', color: theme.palette.customColors.white }} />
      <Typography fontSize={16} fontWeight={600} sx={{ color: theme.palette.customColors.white }} component='span'>
        {addButtonConfig?.label}
      </Typography>
    </StyledFloatingButton>
  );
};

export default FloatingFixedBottomRightButton;
