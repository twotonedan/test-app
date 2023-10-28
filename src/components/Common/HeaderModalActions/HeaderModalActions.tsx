import theme from '@/theme/theme';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Box, Button, IconButton, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled(Button)`
  padding: 10px 12px;
`;

type Props = {
  onClickBack: () => void;
  handleReset: () => void;
  className?: string;
};

const HeaderModalActions = ({ onClickBack, handleReset, className }: Props) => {
  const { t } = useTranslation('actions');

  return (
    <StyledWrapper className={className}>
      <IconButton onClick={onClickBack}>
        <ArrowBackIosNew color='primary' />
      </IconButton>
      <StyledButton onClick={handleReset}>{t('reset')}</StyledButton>
    </StyledWrapper>
  );
};

export default HeaderModalActions;
