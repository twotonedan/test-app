import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import useIsDesktop from '@/hooks/useIsDesktop';
import { IAccessory } from '@/types/accessories';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { DeleteOutline } from '@mui/icons-material';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import { useTranslation } from 'next-i18next';

import ImagesCarousel from '@/components/Common/ImagesCarousel/ImagesCarousel';
import AccessorySwiper from '../AccessorySwiper';

const StyledWrapper = styled(Box, transientOptions)<{ $isHighlighted?: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  background: ${theme.palette.customColors.white};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border: 1px solid ${props => (props.$isHighlighted ? theme.palette.primary.main : theme.palette.common.white)};
  transition: all ease-out 0.1s;
  padding: 16px;
  border-radius: 16px;
  gap: 24px;

  ${theme.breakpoints.up('lg')} {
    max-width: 644px;
  }
`;

const StyledBottomLeftWrapper = styled(Box)`
  flex-grow: 1;
`;

const StyledRightWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledTitleWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledButtonsWrapper = styled(Box)`
  display: flex;
  gap: 24px;
`;

const StyledShareButton = styled(IconButton)`
  background: ${theme.palette.customColors.lightGray};
  color: ${theme.palette.customText.primary};
`;

const StyledTrashButton = styled(IconButton)`
  color: ${theme.palette.error.main};
`;

const StyledTitleDescription = styled(Typography)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const StyledActionsContainer = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  gap: auto;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const StyledButton = styled(Button)`
  ${theme.breakpoints.up('lg')} {
    width: 100%;
  }
`;

type Props = {
  accessory: IAccessory;
  price: string;
  quantity: number;
  hasTag?: boolean;
  showTrashIcon?: boolean;
  showAddButton?: boolean;
  accessoryHandlerComponent?: React.ReactNode;
  handleAddAccessory: (quantity: number) => void;
  hidePricing?: boolean;
};

const TabletCard = ({
  accessory,
  price,
  quantity,
  hasTag,
  showTrashIcon,
  showAddButton,
  accessoryHandlerComponent,
  handleAddAccessory,
  hidePricing,
}: Props) => {
  const isDesktop = useIsDesktop();
  const { t } = useTranslation();
  const { handleRemoveAllAccessoryQuantity } = useCurrentCartItem();

  const handleRemoveAccessory = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleRemoveAllAccessoryQuantity(accessory.id);
  };
  return (
    <StyledWrapper component='article' $isHighlighted={quantity > 0}>
      {isDesktop ? (
        <ImagesCarousel
          images={accessory.imagesDetail}
          width={233}
          height={260}
          smallGap
          hasTag={hasTag}
          tagColor={accessory.tag.color}
          tagLabel={accessory.tag.label}
        />
      ) : (
        <AccessorySwiper
          images={accessory.imagesDetail}
          hasTag={hasTag}
          tagColor={accessory.tag.color}
          tagLabel={accessory.tag.label}
        />
      )}
      <StyledRightWrapper>
        <StyledTitleWrapper>
          <Typography variant='h2' fontWeight={600}>
            {accessory.title}
          </Typography>
          <StyledButtonsWrapper>
            <StyledShareButton aria-label='share'>
              <ShareOutlinedIcon />
            </StyledShareButton>
            {showTrashIcon && (
              <StyledTrashButton onClick={e => handleRemoveAccessory(e)}>
                <DeleteOutline />
              </StyledTrashButton>
            )}
          </StyledButtonsWrapper>
        </StyledTitleWrapper>
        <Typography fontWeight={400} fontSize={16} lineHeight='22px'>
          {price}
        </Typography>
        <StyledTitleDescription fontWeight={600} fontSize={16}>{`${t('common:description')}`}</StyledTitleDescription>
        <Typography variant='h4'>{accessory.description}</Typography>
        {!hidePricing && (
          <StyledActionsContainer>
            <StyledBottomLeftWrapper>{quantity > 0 && accessoryHandlerComponent}</StyledBottomLeftWrapper>
            {showAddButton && (
              <StyledButton onClick={() => handleAddAccessory(quantity)} variant='contained' disabled={false}>
                {`${t('common:add')}`} {price}
              </StyledButton>
            )}
          </StyledActionsContainer>
        )}
      </StyledRightWrapper>
    </StyledWrapper>
  );
};

export default TabletCard;
