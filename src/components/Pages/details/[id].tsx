import Error from 'next/error';
import ItemDetail from '@/components/Sections/Details/ItemDetail';
import useGetItemById from '@/hooks/api/useGetItemById';
import { useRouteProps } from '@/hooks/contexts/useRouteProps';

export default function ItemDetails() {
  const { query } = useRouteProps();
  const { id: cardId = '' } = query;
  const { data: cardData } = useGetItemById(cardId);

  if (!cardData) return <Error statusCode={404} />;

  return <ItemDetail cardId={cardId} cardData={cardData} />;
}
