import { styled, Box, IconButton, SvgIcon, Typography, Divider, Button } from '@mui/material';
import Link from 'next/link';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import { SupportedIcons } from '@/constants/icons/supportedIcons';
import LinkIcon from '@mui/icons-material/Link';
import { FormProvider, useForm } from 'react-hook-form';
import loginFormSchema, { ILoginFormSchema } from '@/validationSchemas/checkoutLoginFormSchema/checkoutLoginFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserState } from '@/hooks/contexts/useUserState';
import InputPassword from '@/components/Common/InputPassword/InputPassword';
import Input from '../../../Input/Input';

const StyledInputsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;

  ${theme.breakpoints.up('lg')} {
    gap: 16px;
  }
`;

const StyledLoginButtons = styled(Box)`
  width: 100%;
  justify-content: center;
  display: flex;
  gap: 25px;
  margin-bottom: 20px;

  ${theme.breakpoints.up('lg')} {
    justify-content: space-between;
    margin-bottom: 24px;
  }
`;

const StyledMagicLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 9px;
  color: ${theme.palette.primary.main};
  text-decoration: none;
  h4 {
    font-weight: 600;
    color: ${theme.palette.primary.main};
  }

  ${theme.breakpoints.up('lg')} {
    padding: 10px 8px;
    white-space: nowrap;
  }
`;

const StyledLoginButton = styled(Button)`
  max-width: 142px;

  ${theme.breakpoints.up('lg')} {
    min-height: 48px;
  }
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 34px;

  ${theme.breakpoints.up('lg')} {
    margin-bottom: 16px;
  }
`;

const StyledOauthBox = styled(Box)`
  padding: 14px 0;
  display: flex;
  gap: 14px;
  justify-content: center;

  ${theme.breakpoints.up('lg')} {
    padding: 0;
    margin-bottom: 16px;
  }
`;

const StyledOauthButtons = styled(Box)`
  display: flex;
  gap: 20px;
  margin-bottom: 57px;

  ${theme.breakpoints.up('lg')} {
    margin-bottom: 0;
  }
`;

const StyledSkipButton = styled(Button)`
  width: 100%;
  margin-bottom: 32px;

  ${theme.breakpoints.up('lg')} {
    margin-bottom: 0;
  }
`;

const StyledContainer = styled('section')`
  ${theme.breakpoints.up('lg')} {
    margin: 0 auto;
    padding: 32px 24px 48px;
    border-radius: 16px;
    border: 1px solid ${theme.palette.customColors.paleGray};
    max-width: 531px;
  }
`;

const StyledSpaceDivider = styled(Divider)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: block;
    width: 100%;
    height: 24px;
    border: none;
  }
`;

const StyledScrolleableContainer = styled(Box)`
  ${theme.mixins.layout}
  margin-top: 21px;

  ${theme.breakpoints.up('lg')} {
    padding: 0;
    height: calc(100vh - 370px);
    overflow: auto;
    margin-top: 58px;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

type Props = {
  onSkipLogin?: () => void;
};

const name = 'loginData';
const defaultValues: ILoginFormSchema = {
  [name]: {
    email: '',
    password: '',
  },
};

function LoginForm({ onSkipLogin }: Props) {
  const { t } = useTranslation(['common']);
  const form = useForm<ILoginFormSchema>({ defaultValues, resolver: yupResolver(loginFormSchema) });
  const { loginUser } = useUserState();

  const onSubmit = () => {};

  const isLoginDisabled = !form.formState.isDirty || !form.formState.isValid;

  return (
    <StyledScrolleableContainer>
      <StyledContainer>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <StyledInputsContainer>
              <Input name={`${name}.email`} fullWidth label={t('email')} validateFields={[`${name}.email`]} />
              <InputPassword name={`${name}.password`} validateFields={[`${name}.password`]} label={t('password')} />
            </StyledInputsContainer>
            <StyledLoginButtons>
              <StyledMagicLink href='#'>
                <Typography variant='h4'>{t('sendMagicLink')}</Typography>
                <LinkIcon />
              </StyledMagicLink>
              <StyledLoginButton fullWidth variant='contained' disabled={isLoginDisabled} onClick={() => loginUser()}>
                {t('login')}
              </StyledLoginButton>
            </StyledLoginButtons>
            <StyledDivider>{t('or')}</StyledDivider>
            <StyledOauthBox>
              <Typography variant='h4'>{t('signInWith')}</Typography>
              <StyledOauthButtons>
                <IconButton>
                  <SvgIcon
                    component={SupportedIcons.GOOGLE}
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    className='icon'
                  />
                </IconButton>
                <IconButton>
                  <SvgIcon
                    component={SupportedIcons.FACEBOOK}
                    viewBox='0 0 28 28'
                    width='28'
                    height='28'
                    className='icon'
                  />
                </IconButton>
                <IconButton>
                  <SvgIcon
                    component={SupportedIcons.INSTAGRAM}
                    viewBox='0 0 28 28'
                    width='28'
                    height='28'
                    className='icon'
                  />
                </IconButton>
              </StyledOauthButtons>
            </StyledOauthBox>
            <StyledSkipButton onClick={onSkipLogin} variant='outlined'>
              {t('skipLogIn')}
            </StyledSkipButton>
          </form>
        </FormProvider>
      </StyledContainer>
      <StyledSpaceDivider />
    </StyledScrolleableContainer>
  );
}

export default LoginForm;
