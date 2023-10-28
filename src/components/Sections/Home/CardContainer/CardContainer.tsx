import ItemCard from '@/components/Common/ItemCard';
import theme from '@/theme';
import { Box, styled, Skeleton } from '@mui/material';
import { ICardPayload } from '@/types/cards';
import { memo } from 'react';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  margin: 24px auto;
  grid-gap: 16px;

  ${theme.breakpoints.up('sm')} {
    grid-template-columns: repeat(1, 1fr);
  }

  ${theme.breakpoints.up('md')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${theme.breakpoints.up('lg')} {
    grid-gap: 24px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

type Props = {
  cards: ICardPayload[];
  loadingFeedItems: boolean;
};

const CardSkeleton = () => (
  <>
    <Skeleton variant='rounded' height='400px' style={{ marginTop: '50px', borderRadius: '10px' }} />
    <Skeleton variant='rounded' height='400px' style={{ marginTop: '50px', borderRadius: '10px' }} />
  </>
);

const CardContainer = ({ cards, loadingFeedItems }: Props) => {
  return (
    <StyledWrapper component='section'>
      {loadingFeedItems && <CardSkeleton />}
      {!loadingFeedItems &&
        cards.map(cardData => (
          <ItemCard key={cardData.id} cardData={cardData} isUnavailable={!!cardData.isUnavailable} />
        ))}
    </StyledWrapper>
  );
};

export default memo(CardContainer);
