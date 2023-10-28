import { DeleteStripeCardPayload } from '@/hooks/api/useDeleteStripeCard';
import { SaveStripeCardPayload } from '@/hooks/api/useSaveStripeCard';
import StripeService from '@/services/StripeService';
import { ApiHandlers, apiHandlersManager } from '@/utils/apiHandlersManager';
// TODO: ADD class-validator
const handlers: ApiHandlers = {
  /**
   * @swagger
   * /api/stripe/cards:
   *   get:
   *     description: Get all cards from a customer
   *     parameters:
   *      - name: stripeCustomerId
   *        in: query
   *        required: true
   *     responses:
   *       200:
   *         description: Returns all cards from a customer
   */
  GET: async (req, res) => {
    const { stripeCustomerId } = req.query;
    if (!stripeCustomerId) throw new Error('stripeCustomerId is required');

    const cards = await StripeService.getAllCustomerCards(stripeCustomerId as string);
    res.status(200).json(cards);
  },
  /**
   * @swagger
   * /api/stripe/cards:
   *   post:
   *     description: Add a card to a customer
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required: [stripeCustomerId, paymentMethodId]
   *            additionalProperties: false
   *            properties:
   *              stripeCustomerId:
   *                type: string
   *              paymentMethodId:
   *                type: string
   *     responses:
   *       200:
   *         description: Returns the card added
   */
  POST: async (req, res) => {
    const { stripeCustomerId, paymentMethodId } = req.body as SaveStripeCardPayload;

    const card = await StripeService.addPaymentMethodToCustomer(stripeCustomerId, paymentMethodId);
    res.status(200).json(card);
  },
  /**
   * @swagger
   * /api/stripe/cards:
   *   delete:
   *     description: Delete a card from a customer
   *     requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            required: [paymentMethodId]
   *            additionalProperties: false
   *            properties:
   *              paymentMethodId:
   *                type: string
   *     responses:
   *       200:
   *         description: Returns a success message
   */
  DELETE: async (req, res) => {
    const { paymentMethodId } = req.body as DeleteStripeCardPayload;

    await StripeService.deletePaymentMethod(paymentMethodId);
    res.status(200).json({ message: 'Card deleted successfully' });
  },
};

export default apiHandlersManager(handlers);
