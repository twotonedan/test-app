import Input from '@/components/Common/Input/Input';
import subscribeFormSchema, { ISubscribeForm } from '@/validationSchemas/subscribeFormSchema/subscribeFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, Typography, styled } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import theme from '@/theme/theme';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  ${theme.breakpoints.up('md')} {
    margin-top: 8px;
  }
`;

const StyledForm = styled(Box)`
  display: flex;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  background: ${theme.palette.customColors.white};
  border-radius: 8px;
  height: 40px;
  width: 207px;
  ${theme.breakpoints.up('md')} {
    width: 248px;
  }
  ${theme.breakpoints.up('lg')} {
    width: 276px;
  }
`;

const StyledDivider = styled(Divider)`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const SubscribeForm = () => {
  const form = useForm<ISubscribeForm>({ resolver: yupResolver(subscribeFormSchema) });
  const { t } = useTranslation();
  return (
    <StyledWrapper>
      <StyledDivider />
      <Typography variant='label' fontWeight={600}>
        {t('keepUpWithNews')}
      </Typography>
      <FormProvider {...form}>
        <StyledForm>
          <StyledInput name='email' validateFields={['email']} placeholder={t('email')} />
          <Button variant='contained'>{t('subscribe')}</Button>
        </StyledForm>
      </FormProvider>
    </StyledWrapper>
  );
};

export default SubscribeForm;
