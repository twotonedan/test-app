import { Button, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledInfoButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

type Props = {
  onClick?: () => void;
};

const InfoButton = ({ onClick }: Props) => {
  const { t } = useTranslation('common');

  return (
    <StyledInfoButton fullWidth variant='contained' onClick={onClick}>
      {t('info')}
    </StyledInfoButton>
  );
};

export default InfoButton;
