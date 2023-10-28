import * as yup from 'yup';
import { i18n } from 'next-i18next';

export interface ICreditsForm {
  creditsAmount: number;
}

const creditsSchema = (availableCredits: number) =>
  yup.object().shape({
    creditsAmount: yup
      .number()
      .typeError(i18n?.t('common:form.format.number') || 'Please enter a valid number')
      .min(0, i18n?.t('common:form.credits.negative') || 'The amount cannot be negative')
      .max(
        availableCredits,
        i18n?.t('common:form.credits.exceedsAvailableCredits') || 'The amount exceeds the available credits'
      ),
  });
export default creditsSchema;
