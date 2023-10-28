import { Box, Button, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'next-i18next';
import theme from '@/theme/theme';

const StyledCenteredContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  ${theme.breakpoints.up('lg')} {
    padding: 14px 16px;
  }
`;

type Props = {
  onClick?: () => void;
  isDisabled?: boolean;
};

const AddCardButton = ({ onClick, isDisabled }: Props) => {
  const { t } = useTranslation('common');

  return (
    <StyledCenteredContainer>
      <StyledButton variant='text' color='primary' onClick={onClick} disabled={isDisabled}>
        <AddIcon fontSize='small' />
        {t('payment.addNewCard')}
      </StyledButton>
    </StyledCenteredContainer>
  );
};

export default AddCardButton;
