import { map } from 'lodash';
import { Box, styled } from '@mui/material';
import { GeneratedPrices } from '@/hooks/contexts/useCalculatePrice';
import CartRowItem from '../CartRowItem/CartRowItem';

const StyledGroup = styled(Box)`
  display: flex;
  flex-direction: column;
`;

type Props = {
  items: GeneratedPrices['items'][string][];
  onClickAddItem: (id: string, quantity: number) => void;
  onClickRemoveItem: (id: string, quantity: number) => void;
  onClickAddAccessory: (id: string, quantity: number) => void;
  onClickRemoveAccessory: (id: string, quantity: number) => void;
  onCloseModal: () => void;
};

const CartGroupItem = ({
  items,
  onClickAddItem,
  onClickRemoveItem,
  onClickAddAccessory,
  onClickRemoveAccessory,
  onCloseModal,
}: Props) => {
  return (
    <>
      {map(items, item => (
        <StyledGroup key={item.$uniqueId}>
          <CartRowItem
            $uniqueId={item.$uniqueId}
            {...item.$metadata}
            quantity={item.$quantity}
            price={item.subTotal}
            handleAddClick={q => onClickAddItem(item.$uniqueId, q)}
            handleRemoveClick={q => onClickRemoveItem(item.$uniqueId, q)}
            onClosePreCartModal={() => onCloseModal()}
          />
          {map(item.accessories, accesory => (
            <CartRowItem
              $uniqueId={item.$uniqueId}
              key={accesory.$metadata.id}
              parentQuantity={item.$quantity}
              parentTitle={item.$metadata.title}
              {...accesory.$metadata}
              isMandatory={!!accesory.$metadata.limits.min}
              image={accesory.$metadata?.imagesDetail?.[0].src}
              quantity={accesory.$quantity}
              price={accesory.total}
              handleAddClick={q => onClickAddAccessory(accesory.$metadata.id, q)}
              handleRemoveClick={q => onClickRemoveAccessory(accesory.$metadata.id, q)}
            />
          ))}
        </StyledGroup>
      ))}
    </>
  );
};

export default CartGroupItem;
