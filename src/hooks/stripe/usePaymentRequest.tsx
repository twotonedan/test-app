import { BrowserType } from '@/types/enums';
import { useStripe } from '@stripe/react-stripe-js';
import { PaymentRequest, PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useUserOptions } from '../contexts/useUserOptions';
import { useCalculatePrice } from '../contexts/useCalculatePrice';
import useGetCompany from '../api/useGetCompany';

type Props = {
  onPaymentRequest: (ev: PaymentRequestPaymentMethodEvent) => void;
};

const usePaymentRequest = ({ onPaymentRequest }: Props) => {
  const stripe = useStripe();
  const [browserType, setBrowserType] = useState<BrowserType>();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>();
  const { currency } = useUserOptions();
  const { prices } = useCalculatePrice();
  const { data: companyData } = useGetCompany();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (stripe && companyData) {
      const pr = stripe.paymentRequest({
        country: companyData.stripeAccount.country,
        currency: currency.toLowerCase(),
        total: {
          label: t('total'),
          amount: prices.total * 100, // cents: 1$ = 100 cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          if (result.applePay) setBrowserType(BrowserType.APPLE);
          if (result.googlePay) setBrowserType(BrowserType.GOOGLE);

          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async e => {
        onPaymentRequest(e);
      });
    }
  }, [companyData, currency, onPaymentRequest, prices.total, stripe, t]);

  return { browserType, paymentRequest };
};

export default usePaymentRequest;
