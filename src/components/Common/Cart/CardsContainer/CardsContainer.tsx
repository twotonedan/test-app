import { useCartData } from '@/hooks/contexts/useCartData';
import { CurrentCartItemProvider } from '@/hooks/contexts/useCurrentCartItem';
import { Box, styled } from '@mui/material';
import theme from '@/theme/theme';
import CardsSubcontainer from './CardsSubcontainer';

const StyledContainer = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;

type Props = {
  onClose: () => void;
};

const CardsContainer = ({ onClose }: Props) => {
  const { cartData } = useCartData();
  if (!cartData) return null;

  return (
    <StyledContainer>
      {cartData.map(item => (
        <CurrentCartItemProvider key={item.$uniqueId} $uniqueId={item.$uniqueId}>
          <CardsSubcontainer onClose={onClose} />
        </CurrentCartItemProvider>
      ))}
    </StyledContainer>
  );
};

export default CardsContainer;
