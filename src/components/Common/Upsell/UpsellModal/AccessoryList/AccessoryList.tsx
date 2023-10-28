import { Box } from '@mui/system';
import { Skeleton, styled } from '@mui/material';
import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { IAccessory } from '@/types/accessories';
import UpsellCard from '../UpsellCard';

const StyledWrapper = styled(Box, transientOptions)<{ $mobileView: boolean }>`
  ${theme.mixins.layout}
  height: max-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 16px;
  grid-auto-rows: min-content;
  margin-bottom: 10px;

  ${theme.breakpoints.up('md')} {
    grid-template-columns: ${props => (props.$mobileView ? 'repeat(2, 1fr)' : '1fr')};
    margin-top: 24px;
    grid-column-gap: 24px;
  }

  ${theme.breakpoints.up('lg')} {
    margin-top: 22px;
    margin-bottom: 32px;
    grid-template-columns: ${props => (props.$mobileView ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)')};
  }
`;

type Props = {
  isLoading?: boolean;
  mobileView: boolean;
  accessories: IAccessory[];
  hidePricing?: boolean;
};

const AccessoryList = ({ isLoading, mobileView, accessories, hidePricing }: Props) => {
  return (
    <StyledWrapper $mobileView={mobileView}>
      {isLoading
        ? // eslint-disable-next-line react/no-array-index-key
          [...new Array(6)].map((_, i) => <Skeleton key={`accesories-skeleton-${i}`} variant='rounded' height={184} />)
        : accessories.map(accessory => (
            <UpsellCard key={accessory.id} accessory={accessory} mobileView={mobileView} hidePricing={hidePricing} />
          ))}
    </StyledWrapper>
  );
};

export default AccessoryList;
