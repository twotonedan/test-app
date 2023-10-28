import { Button, styled } from '@mui/material';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import theme from '@/theme/theme';

const StyledButton = styled(Button)`
  border-radius: 999px;
  min-width: 40px;
  width: 40px;
  height: 40px;
  padding: 10px;
  background: ${theme.palette.customColors.lightGray};
  color: ${theme.palette.customText.primary};
`;

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  accessoryMobileView: boolean;
  className?: string;
};

const AcessoryViewButton = ({ onClick, accessoryMobileView, className }: Props) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      {accessoryMobileView ? <ViewModuleOutlinedIcon fontSize='small' /> : <ViewAgendaOutlinedIcon fontSize='small' />}
    </StyledButton>
  );
};

export default AcessoryViewButton;
