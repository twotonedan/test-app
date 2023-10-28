import { PaymentPayload } from '@/hooks/api/useCreateStripeIntent';
import { getAccessoriesByIds } from '@/hooks/api/useGetAccessoriesByIds';
import { uniq } from 'lodash';
import { getItemsByIds } from '@/hooks/api/useGetItemsByIds';
import { calculatePrice } from '@/hooks/contexts/useCalculatePrice';
import StripeService from '@/services/StripeService';
import Stripe from 'stripe';
import { ApiHandlers, apiHandlersManager } from '@/utils/apiHandlersManager';

const handlers: ApiHandlers = {
  /**
   * @swagger
   * /api/stripe/pay:
   *   post:
   *     description: Pay for an order
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required: [stripeCustomerId, paymentMethodId, cartData, promoCodeData, confirm]
   *            additionalProperties: false
   *            properties:
   *              stripeCustomerId:
   *                type: string
   *              paymentMethodId:
   *                type: string
   *              cartData:
   *                type: no-defined
   *              promoCodeData:
   *                type: no-defined
   *              confirm:
   *                type: boolean
   *     responses:
   *       200:
   *         description: Returns the payment intent
   */
  POST: async (req, res) => {
    const { stripeCustomerId, paymentMethodId, cartData, creditsData, promoCodeData, confirm } =
      req.body as PaymentPayload;

    const [freshItems = [], freshAccessories = []] = await Promise.all([
      getItemsByIds(cartData.map(item => item.id)),
      getAccessoriesByIds(uniq(cartData.flatMap(item => item.accessories.map(accessory => accessory.id)))),
    ]);

    const { total } = calculatePrice(cartData, promoCodeData, freshItems, freshAccessories, creditsData);

    try {
      const paymentIntent = await StripeService.createPaymentIntent(
        total,
        stripeCustomerId || undefined,
        paymentMethodId || undefined,
        confirm
      );

      res.status(200).json({ message: 'Payment was successful', paymentIntent });
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        res
          .status(error.statusCode as number)
          .json({ code: error.code, statuscode: error.statusCode, declineCode: error.decline_code });
      } else {
        res.status(500).json({ code: 500, statuscode: 'Unexpected error' });
      }
    }
  },
};

export default apiHandlersManager(handlers);
