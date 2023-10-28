import { Box, styled } from '@mui/material';
import { memo } from 'react';
import theme from '@/theme';
import { ReusableCardType } from '@/types/reusableCards';
import useGetReusableCardData from '@/hooks/api/useGetReusableCardData';
import ReusableCard from './ReusableCard';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  margin: 20px auto;
`;

const ListCards = () => {
  const { data: cards } = useGetReusableCardData();
  return (
    <StyledWrapper component='section'>
      {cards?.map((cardProp: ReusableCardType, index: number) => {
        // eslint-disable-next-line react/no-array-index-key
        return <ReusableCard key={index} cardProps={cardProp} />;
      })}
    </StyledWrapper>
  );
};

export default memo(ListCards);
