/* eslint-disable no-console */
import COMPANY_DATA from '@/mock/COMPANY_DATA';
import Stripe from 'stripe';

class StripeService {
  stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_KEY_SECRET, { apiVersion: '2022-11-15' });
  }

  async getAllCustomerCards(customerId: string) {
    console.info('Getting all cards...', { customerId });

    const paymentMethods = await this.stripe.customers.listPaymentMethods(customerId, { type: 'card' });
    return paymentMethods.data;
  }

  async addPaymentMethodToCustomer(customerId: string, paymentMethodId: string) {
    console.info('Adding card...', { customerId, paymentMethodId });

    const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    return paymentMethod;
  }

  async deletePaymentMethod(cardId: string) {
    console.info('Deleting card...', { cardId });

    const paymentMethod = await this.stripe.paymentMethods.detach(cardId);
    return paymentMethod;
  }

  async createPaymentIntent(
    amount: number,
    customerId: string | undefined,
    paymentMethodId: string | undefined,
    confirm = false
  ) {
    console.info('Processing payment...', { amount, customerId });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // cents: 1$ = 100 cents
      currency: COMPANY_DATA.currency.defaultCurrency, // TODO: pull from context
      customer: customerId,
      payment_method: paymentMethodId,
      confirm,
      setup_future_usage: 'off_session',
    });

    return paymentIntent;
  }
}

export default new StripeService();
