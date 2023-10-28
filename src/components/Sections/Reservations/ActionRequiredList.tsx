import { BookingActionRequiredItem } from '@/types/bookings';
import ActionRequiredItem from './ActionRequiredItem';

type Props = {
  actionRequiredItems: BookingActionRequiredItem[];
};

const ActionRequiredList = ({ actionRequiredItems }: Props) => {
  return (
    <>
      {actionRequiredItems.map(item => (
        <ActionRequiredItem key={`${item.name}-${item.link}`} actionRequiredItem={item} />
      ))}
    </>
  );
};

export default ActionRequiredList;
