import CheckoutLayout from '@/components/Common/Checkout/CheckoutLayout/CheckoutLayout';
import Layout from '@/components/Layout';
import LoginContent from '@/components/Common/Checkout/LoginContent/LoginContent';
import CheckoutHeader from '@/components/Common/Checkout/CheckoutHeader/CheckoutHeader';
import { CheckoutStepsEnum } from '@/types/enums';
import useGetCheckoutSteps from '@/hooks/api/useGetCheckoutSteps';
import { StepsProvider, useSteps } from '@/hooks/contexts/useSteps';
import TermsAndConditions from '@/components/Common/Checkout/TermsAndConditions/TermsAndConditions';
import PaymentContent from '@/components/Common/Checkout/PaymentContent/PaymentContent';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCartData } from '@/hooks/contexts/useCartData';

const StepComponents: { [k in CheckoutStepsEnum]: JSX.Element } = {
  [CheckoutStepsEnum.REGISTER]: <LoginContent />,
  [CheckoutStepsEnum.TAC]: <TermsAndConditions />,
  [CheckoutStepsEnum.CHECKOUT]: <PaymentContent />,
};

const StepHandler = () => {
  const { currentStep } = useSteps();
  return currentStep ? StepComponents[currentStep as CheckoutStepsEnum] : null;
};

export default function CheckoutPage() {
  const { data: steps = [] } = useGetCheckoutSteps();

  const { cartData } = useCartData();
  const router = useRouter();
  const cartItemExists = cartData.length > 0;

  useEffect(() => {
    if (!cartItemExists) {
      router.push('/');
    }
  }, [cartItemExists, router]);

  if (cartItemExists) {
    return (
      <StepsProvider initialStep={0} steps={steps}>
        <Layout title='Stellar' header={<CheckoutHeader />}>
          <CheckoutLayout>
            <StepHandler />
          </CheckoutLayout>
        </Layout>
      </StepsProvider>
    );
  }
  return null;
}
