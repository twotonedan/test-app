import theme from '@/theme/theme';
import { styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledRequiredText = styled('span')`
  color: ${theme.palette.error.main};
`;

const RequiredLabel = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <StyledRequiredText>*</StyledRequiredText>
      {t('required')}
    </>
  );
};

export default RequiredLabel;
