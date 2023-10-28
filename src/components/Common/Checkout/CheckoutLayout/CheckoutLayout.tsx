import { ReactNode, memo } from 'react';
import { styled, Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import theme from '@/theme';
import useGetCheckoutSteps from '@/hooks/api/useGetCheckoutSteps';
import { useSteps } from '@/hooks/contexts/useSteps';
import { useTranslation } from 'next-i18next';
import PricingSummary from '../PricingSummary/PricingSummary';
import CheckoutStepIcon from '../CheckoutStepIcon/CheckoutStepIcon';
import LeftDesktopWrapper from '../LeftDesktopWrapper';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;

  ${theme.breakpoints.up('lg')} {
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    flex-direction: row-reverse;
    align-items: flex-start;
    max-height: calc(100vh - 88px);
    align-items: stretch;
  }
`;

const StyledChildren = styled(Box)`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledStepper = styled(Stepper)`
  margin-bottom: 12px;
  margin-top: 24px;
  max-height: 20px;
  height: 100%;
  box-sizing: border-box;

  .MuiStepLabel-iconContainer {
    padding: 0;
  }

  ${theme.breakpoints.up('lg')} {
    margin-top: 0;
  }
`;

const StyledDekstopTitle = styled(Typography)`
  display: none;
  font-size: 32px;
  line-height: 38px;

  ${theme.breakpoints.up('lg')} {
    display: block;
    margin: 32px 0 24px;
  }
`;

const StyledInnerWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

const StyledStep = styled(Step)`
  ${theme.breakpoints.up('lg')} {
    padding: 0;
  }
`;

const StyledLeftWrapper = styled(LeftDesktopWrapper)`
  max-height: 60px;

  ${theme.breakpoints.up('lg')} {
    max-height: unset;
  }
`;

type Props = {
  children?: ReactNode;
};

const CheckoutLayout = ({ children }: Props) => {
  const { data: steps = [] } = useGetCheckoutSteps();
  const { currentStep } = useSteps();
  const { t } = useTranslation('common');

  const currentStepIndex = steps.findIndex(step => step === currentStep) || 0;

  return (
    <StyledWrapper>
      <PricingSummary />
      <StyledInnerWrapper>
        <StyledLeftWrapper>
          <StyledDekstopTitle variant='h1'>{t('checkOut.title')}</StyledDekstopTitle>

          <StyledStepper activeStep={currentStepIndex}>
            {steps.map(label => (
              <StyledStep key={label}>
                <StepLabel StepIconComponent={CheckoutStepIcon} />
              </StyledStep>
            ))}
          </StyledStepper>
        </StyledLeftWrapper>
        <StyledChildren>{children}</StyledChildren>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default memo(CheckoutLayout);
