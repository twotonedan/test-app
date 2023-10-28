import NiceModal from '@ebay/nice-modal-react';
import { useId } from 'react';
import { isValid } from 'date-fns';
import useTwoDigitsFormatDate, { DateOrDateRange, DateRange } from './formatters/useTwoDigitsFormatDate';

type Props = {
  date?: DateOrDateRange;
};

const useUpsellModal = ({ date }: Props) => {
  const id = useId();
  const upsellId = `upsell-context-modal-${id}`;
  const handleOnClickConfirm = ($uniqueId: string) => {
    NiceModal.show(upsellId, { $uniqueId });
  };
  const { formatDates } = useTwoDigitsFormatDate();
  const formattedDate =
    isValid(date) || !!((date as DateRange)?.start && (date as DateRange)?.end) ? formatDates(date) : null;

  return { upsellId, handleOnClickConfirm, formattedDate };
};

export default useUpsellModal;
