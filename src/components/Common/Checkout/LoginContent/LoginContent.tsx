import { Box, styled, Typography } from '@mui/material';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import { useUserState } from '@/hooks/contexts/useUserState';
import { useState } from 'react';
import LoginForm from './LoginForm/LoginForm';
import CustomerInformation from './CustomerInformation';

const StyledTypographyCustmer = styled(Typography)`
  font-size: 16px;
  font-weight: 600;

  margin-left: 2px;

  ${theme.breakpoints.up('lg')} {
    font-size: 18px;
    margin-left: 0;
  }
`;

const StyledContainer = styled(Box)`
  ${theme.mixins.layout}
`;

function LoginContent() {
  const [skipLogin, setSkipLogin] = useState(false);
  const { t } = useTranslation('common');
  const { isLoggedIn } = useUserState();

  return (
    <>
      <StyledContainer>
        <StyledTypographyCustmer>{t('customerInfo.title')}</StyledTypographyCustmer>
      </StyledContainer>
      {!skipLogin && !isLoggedIn ? <LoginForm onSkipLogin={() => setSkipLogin(true)} /> : <CustomerInformation />}
    </>
  );
}

export default LoginContent;
