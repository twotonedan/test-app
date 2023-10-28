import { styled, Typography, Button, Box, CircularProgress, Divider } from '@mui/material';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import FooterDrawer from '@/components/Common/FooterDrawer/FooterDrawer';
import CheckboxComponent from '@/components/Common/Checkbox/Checkbox';
import { FormProvider, useForm } from 'react-hook-form';
import AddPaymentFormSchema, {
  IAddPaymentForm,
} from '@/validationSchemas/checkoutAddPaymentSchema/checkoutAddPaymentSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSteps } from '@/hooks/contexts/useSteps';
import { useUserState } from '@/hooks/contexts/useUserState';
import { useCartData } from '@/hooks/contexts/useCartData';
import usePaymentHandlers from '@/hooks/usePaymentHandlers';
import { PaymentContextProvider } from '@/hooks/contexts/usePaymentContext';
import usePostCheckoutModal from '@/hooks/usePostCheckoutModal';
import CardForm from '../CardForm/CardForm';
import CardsFormWithUser from '../CardsFormWithUser/CardsFormWithUser';
import EditCardButton from './EditCardButton/EditCardButton';
import AppleGoogleButton from './AppleGoogleButton/AppleGoogleButton';
import PostCheckoutModal from '../../PostCheckoutModal/PostCheckoutModal';
import LeftDesktopWrapper from '../../LeftDesktopWrapper';
import CreditsSwitch from './CreditsSwitch';

const StyledInnerWrapper = styled(Box)`
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
    min-width: 165px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 23px 24px;
  }
`;

const StyledTypographyMainTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;

  ${theme.breakpoints.up('lg')} {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const StyledTypographySelectMethod = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
  display: none;
  ${theme.breakpoints.up('md')} {
    display: block;
  }

  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledSelectMethodDesktop = styled(Typography)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: block;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
`;

const StyledTypographyTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
`;

const StyledContainer = styled('section')`
  ${theme.breakpoints.up('lg')} {
    padding: 0;
    height: calc(100vh - 328px);
  }
`;

const StyledContainerHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  ${theme.breakpoints.up('lg')} {
    margin-bottom: 16px;
    padding: 8px 0;
  }
`;

const StyledCardsContainer = styled(Box)`
  border: 1px solid ${theme.palette.customColors.gray};
  padding: 12px 16px;
  border-radius: 16px;
  margin-bottom: 24px;

  ${theme.breakpoints.up('lg')} {
    margin: 0;
    padding: 32px 24px;

    :after {
      content: '';
      position: relative;
      width: 20px;
      height: 20px;
      background-color: red;
    }
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

const StyledCircularProgress = styled(CircularProgress)`
  color: ${theme.palette.customColors.white};
`;

const StyledScrollableZone = styled(Box)`
  margin-top: 24px;

  ${theme.breakpoints.up('lg')} {
    display: flex;
    height: calc(100vh - 360px);
    overflow: auto;
  }
`;

const StyledPaymentsOptions = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  ${theme.breakpoints.up('md')} {
    max-width: 522px;
    padding: 32px 24px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 0;
  }
`;

const StyledAppleGoogleButtonMobile = styled(AppleGoogleButton)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledAppleGoogleButtonDesktop = styled(AppleGoogleButton)`
  display: none;
  ${theme.breakpoints.up('lg')} {
    display: initial;
  }
`;

const StyledCheckboxComponentMobile = styled(CheckboxComponent)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledCheckboxComponentDesktop = styled(CheckboxComponent)`
  &.MuiButtonBase-root {
    margin-top: 3px;
  }
`;

const StyledCheckboxLabel = styled(Typography)`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

const StyledCheckboxWrapper = styled(Box)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: initial;
    display: flex;
    margin-top: 16px;
  }
`;

const StyledFooter = styled(FooterDrawer)`
  padding: 16px 24px;
  ${theme.breakpoints.up('lg')} {
    background-color: ${theme.palette.common.white};
    box-shadow: none;
    padding: 24px 48px 24px 65px;
  }
`;

function PaymentMethods() {
  const { t } = useTranslation('common');

  const form = useForm<IAddPaymentForm>({ resolver: yupResolver(AddPaymentFormSchema) });
  const { isValid: formIsValid, isDirty: formIsDirty } = form.formState;
  const { postCheckoutModalId } = usePostCheckoutModal();

  const { currencyFormatter } = useCurrencyFormatter();
  const { prevStep } = useSteps();

  const { userData } = useUserState();

  const { cartData } = useCartData();
  const { prices, promoCodeData } = useCalculatePrice();
  const {
    isPayDisabled,
    isPayInProgress,
    handleSubmit,
    selectedCard,
    setSelectedCard,
    setIsEditCardsMode,
    isEditCardsMode,
    handleSubmitPaymentRequest,
  } = usePaymentHandlers({
    cartData,
    promoCodeData,
  });

  const isSubmitDisabled = !formIsValid || !formIsDirty || isPayDisabled;

  return (
    <PaymentContextProvider
      stripeCustomerId={userData?.stripeCustomerId}
      setSelectedCard={setSelectedCard}
      setIsEditCardsMode={setIsEditCardsMode}
      selectedCard={selectedCard}
      isEditCardsMode={isEditCardsMode}>
      <LeftDesktopWrapper>
        <StyledContainer>
          <FormProvider {...form}>
            <StyledTypographyMainTitle>{t('payment.title')}</StyledTypographyMainTitle>
            <CreditsSwitch />
            <StyledScrollableZone>
              <StyledPaymentsOptions>
                <StyledTypographySelectMethod>{t('payment.selectMethod')}</StyledTypographySelectMethod>
                <StyledAppleGoogleButtonMobile onPaymentRequest={handleSubmitPaymentRequest} />
                <StyledCardsContainer>
                  <StyledSelectMethodDesktop>{t('payment.selectMethod')}</StyledSelectMethodDesktop>
                  <StyledAppleGoogleButtonDesktop onPaymentRequest={handleSubmitPaymentRequest} />
                  <StyledContainerHeader>
                    <StyledTypographyTitle>{t('payment.creditCard')}</StyledTypographyTitle>
                    <EditCardButton />
                  </StyledContainerHeader>
                  {userData?.stripeCustomerId ? <CardsFormWithUser /> : <CardForm />}

                  <StyledCheckboxWrapper>
                    <StyledCheckboxComponentDesktop
                      label=''
                      name='checkAuthorize'
                      validateFields={['checkAuthorize']}
                    />
                    <StyledCheckboxLabel>{t('payment.authorize')}</StyledCheckboxLabel>
                  </StyledCheckboxWrapper>
                </StyledCardsContainer>
                <StyledSpaceDivider />

                <StyledCheckboxComponentMobile
                  label={t('payment.authorize')}
                  name='checkAuthorize'
                  validateFields={['checkAuthorize']}
                />
              </StyledPaymentsOptions>
            </StyledScrollableZone>
          </FormProvider>
        </StyledContainer>
      </LeftDesktopWrapper>

      <StyledFooter>
        <StyledInnerWrapper>
          <StyledButtonBack variant='outlined' onClick={prevStep}>
            {t('back')}
          </StyledButtonBack>
          <StyledButton variant='contained' onClick={handleSubmit} disabled={isSubmitDisabled || isPayInProgress}>
            {isPayInProgress ? (
              <StyledCircularProgress size={20} />
            ) : (
              <>
                {t('payment.pay')} {currencyFormatter.format(prices.total)}
              </>
            )}
          </StyledButton>
        </StyledInnerWrapper>
      </StyledFooter>
      <PostCheckoutModal id={postCheckoutModalId} />
    </PaymentContextProvider>
  );
}

export default PaymentMethods;
