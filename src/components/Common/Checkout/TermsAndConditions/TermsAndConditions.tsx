import { useEffect } from 'react';
import { styled, Box, Typography, Divider, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import theme from '@/theme';
import useGetTermsAndConditions from '@/hooks/api/useGetTermsAndConditions';
import { FormProvider, useForm } from 'react-hook-form';
import TACFormSchema, { ITACForm } from '@/validationSchemas/checkoutTACFormSchema/checkoutTACFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSteps } from '@/hooks/contexts/useSteps';
import CheckboxComponent from '../../Checkbox/Checkbox';
import FooterDrawer from '../../FooterDrawer/FooterDrawer';
import LeftDesktopWrapper from '../LeftDesktopWrapper';

const StyledTextBox = styled(Box)`
  border: 1px solid ${theme.palette.customColors.gray};
  padding: 16px 16px 24px;
  border-radius: 16px;
  width: 100%;
  height: fit-content;
  margin-top: 16px;

  ${theme.breakpoints.up('lg')} {
    max-height: calc(100vh - 390px);
    overflow: scroll;
    padding: 24px;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const StyledTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;

  ${theme.breakpoints.up('lg')} {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const StyledDescription = styled(Typography)`
  white-space: break-spaces;
  margin-bottom: 16px;
`;

const StyledCheckContainer = styled(Box)`
  margin-top: 20px;
  & .MuiFormControlLabel-root {
    align-items: flex-start;
  }
  & .MuiTypography-root {
    padding-top: 9px;
  }
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  ${theme.breakpoints.up('lg')} {
    padding: 0;
  }
`;

const StyledButtonBack = styled(Button)`
  width: 40%;
  ${theme.breakpoints.up('md')} {
    width: auto;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 23px 54px;
  }
`;

const StyledButton = styled(Button)`
  width: 60%;
  ${theme.breakpoints.up('md')} {
    width: auto;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 24px 60px;
  }
`;

const StyledContainer = styled(Box)`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('lg')} {
    padding: 0;
  }
`;

const StyledFooter = styled(FooterDrawer)`
  ${theme.breakpoints.up('lg')} {
    background-color: ${theme.palette.common.white};
    box-shadow: none;
    padding: 24px 48px 24px 65px;
  }
`;

const SyledSubtitle = styled(Typography)`
  ${theme.breakpoints.up('lg')} {
    font-size: 16px;
  }
`;

const TermsAndConditions = () => {
  const form = useForm<ITACForm>({
    resolver: yupResolver(TACFormSchema),
  });
  const { isDirty } = form.formState;
  const { t } = useTranslation('common');
  const { data: termsAndConditionsText = '', status } = useGetTermsAndConditions();
  const { nextStep, prevStep } = useSteps();
  const isNextDisabled = !form.formState.isValid || !isDirty;

  const handleGoToNextPage = () => nextStep();

  useEffect(() => {
    if (termsAndConditionsText === '' && status === 'success') handleGoToNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termsAndConditionsText, status]);

  return (
    <FormProvider {...form}>
      <LeftDesktopWrapper>
        <StyledContainer>
          <StyledTitle>{t('termsAndConditions.title')}</StyledTitle>
          <SyledSubtitle variant='h4'>{t('termsAndConditions.description')}</SyledSubtitle>
          <StyledTextBox>
            <StyledDescription variant='h4'>{termsAndConditionsText}</StyledDescription>
            <Divider />
            <StyledCheckContainer>
              <CheckboxComponent
                label={t('termsAndConditions.checkTAC')}
                name='checkTAC'
                validateFields={['checkTAC', 'checkOthers']}
              />
              <CheckboxComponent
                label={t('termsAndConditions.checkOthers')}
                name='checkOthers'
                validateFields={['checkTAC', 'checkOthers']}
              />
            </StyledCheckContainer>
          </StyledTextBox>
        </StyledContainer>
      </LeftDesktopWrapper>

      <StyledFooter>
        <StyledInnerWrapper>
          <StyledButtonBack variant='outlined' onClick={prevStep}>
            {t('back')}
          </StyledButtonBack>
          <StyledButton disabled={isNextDisabled} onClick={handleGoToNextPage} variant='contained'>
            {t('accept')}
          </StyledButton>
        </StyledInnerWrapper>
      </StyledFooter>
    </FormProvider>
  );
};

export default TermsAndConditions;
