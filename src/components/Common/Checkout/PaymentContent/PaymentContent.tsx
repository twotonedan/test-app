import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { NewPaymentCardProvider } from '@/hooks/contexts/useNewPaymentCard';
import StripeContainer from './PaymentMethods/PaymentMethods';

const fonts = [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap' }];
const stripe = process.env.NEXT_PUBLIC_STRIPE_KEY && loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function PaymentContent() {
  if (!stripe) return null;
  return (
    <Elements stripe={stripe} options={{ fonts }}>
      <NewPaymentCardProvider>
        <StripeContainer />
      </NewPaymentCardProvider>
    </Elements>
  );
}

export default PaymentContent;
