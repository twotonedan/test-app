import { Box, Skeleton, styled } from '@mui/material';
import theme from '@/theme';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Stripe from 'stripe';
import { usePaymentContext } from '@/hooks/contexts/usePaymentContext';
import CardRow from '../CardRow/CardRow';

const StyledFormControl = styled(FormControl)`
  width: 100%;
`;

const StyledContainer = styled(Box)`
  margin: 12px 0;
`;

const StyledRadioGroup = styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  border: 1px solid ${theme.palette.customColors.gray};
  border-radius: 8px;
  justify-content: space-between;
  height: 52px;
`;

type Props = {
  isLoading?: boolean;
  cards?: Stripe.PaymentMethod[];
};

function SavedCards({ isLoading, cards = [] }: Props) {
  const { setShowAddCardForm, setSelectedCard, selectedCard } = usePaymentContext();

  const handleOnChange = (cardId: string) => {
    setShowAddCardForm(false);
    setSelectedCard(cardId);
  };

  return (
    <StyledContainer>
      <StyledFormControl>
        <StyledRadioGroup>
          {isLoading ? (
            <Skeleton variant='rounded' height={52} />
          ) : (
            cards.map(cardItem => {
              const { card } = cardItem;
              if (!card) return null;
              return (
                <StyledFormControlLabel
                  value={cardItem.id}
                  control={<Radio />}
                  key={cardItem.id}
                  labelPlacement='start'
                  onChange={() => handleOnChange(cardItem.id)}
                  checked={selectedCard === cardItem.id}
                  label={
                    <CardRow brand={card.brand} last4={card.last4} expMonth={card.exp_month} expYear={card.exp_year} />
                  }
                />
              );
            })
          )}
        </StyledRadioGroup>
      </StyledFormControl>
    </StyledContainer>
  );
}

export default SavedCards;
