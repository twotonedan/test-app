import theme from '@/theme/theme';
import { TagColor } from '@/types/enums';
import { Box, Button, IconButton, Modal, Typography, styled } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import QuantityCounter from '@/components/Common/QuantityCounter/QuantityCounter';
import { IImage, IQuantityLimits } from '@/types/common';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useTranslation } from 'next-i18next';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import { CloseRounded } from '@mui/icons-material';
import { ILocation } from '@/types/accessories';
import useIsDesktop from '@/hooks/useIsDesktop';

import ImagesCarousel from '@/components/Common/ImagesCarousel/ImagesCarousel';
import EditLocationButton from '../EditLocationButton';
import AccessorySwiper from '../UpsellCard/AccessorySwiper';

const StyledDrawer = styled(Modal)``;

const StyledContainer = styled(Box)`
  background: ${theme.palette.customColors.white};
  width: 605px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px 24px 32px 24px;
  border-radius: 16px;

  ${theme.breakpoints.up('lg')} {
    width: 865px;
  }
`;

const StyledHeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledSubWrapper = styled(Box)`
  display: flex;
  margin-top: 16px;
  gap: 24px;
`;

const StyledRightWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledPriceWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
`;

const StyledTitleDescription = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const StyledActionsContainer = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
`;

interface AccesoryDetail {
  accessoryId: string;
  title?: string;
  description?: string;
  images: IImage[];
  price: number;
}

type Props = {
  accesoryDetail: AccesoryDetail;
  tag?: {
    label: string;
    color: TagColor;
  };
  limits: IQuantityLimits;
  quantity: number;
  onClose: () => void;
  isOpen: boolean;
  locations?: ILocation[];
  selectedLocation?: ILocation;
  handleShowLocationModal: () => void;
  handleEditLocation: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  hidePricing?: boolean;
};

const ModalCard = ({
  accesoryDetail,
  tag,
  limits,
  quantity,
  onClose,
  isOpen,
  locations,
  selectedLocation,
  handleShowLocationModal,
  handleEditLocation,
  hidePricing,
}: Props) => {
  const { t } = useTranslation(['common', 'filters']);
  const { accessoryId, title, description, images, price } = accesoryDetail;
  const hasTag = Boolean(tag?.label);
  const { currencyFormatter } = useCurrencyFormatter();
  const { $uniqueId, handleAddAccessoryQuantity, handleRemoveAccessoryQuantity } = useCurrentCartItem();
  const { prices } = useCalculatePrice();
  const isDesktop = useIsDesktop();

  const handleAddWithLocation = () => {
    if (locations && !selectedLocation) {
      handleShowLocationModal();
    } else {
      onClose();
    }
  };

  return (
    <StyledDrawer open={isOpen} onClose={onClose}>
      <StyledContainer>
        <StyledHeaderWrapper>
          <Typography variant='h2' lineHeight='26px'>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseRounded color='primary' />
          </IconButton>
        </StyledHeaderWrapper>
        <StyledSubWrapper>
          {isDesktop ? (
            <ImagesCarousel
              images={images}
              width={352}
              height={336}
              hasTag={hasTag}
              tagColor={tag?.color}
              tagLabel={tag?.label}
            />
          ) : (
            <AccessorySwiper images={images} hasTag={hasTag} tagColor={tag?.color} tagLabel={tag?.label} />
          )}
          <StyledRightWrapper>
            <StyledPriceWrapper>
              <StyledTitle variant='h2'>{currencyFormatter.format(price)}</StyledTitle>
              <IconButton aria-label='share'>
                <ShareOutlinedIcon />
              </IconButton>
            </StyledPriceWrapper>
            <StyledTitleDescription>{`${t('common:description')}`}</StyledTitleDescription>
            <Typography variant='h4'>{description}</Typography>
            {!hidePricing && (
              <StyledActionsContainer>
                {!locations && (
                  <QuantityCounter
                    limits={limits}
                    quantity={quantity}
                    handleAddClick={q => handleAddAccessoryQuantity(accessoryId, q)}
                    handleRemoveClick={q => handleRemoveAccessoryQuantity(accessoryId, q)}
                  />
                )}
                {locations && <EditLocationButton onClick={handleEditLocation} selectedLocation={selectedLocation} />}
                <StyledButton onClick={handleAddWithLocation} variant='contained' disabled={quantity < 1}>
                  {`${t('common:add')}`}{' '}
                  {currencyFormatter.format(prices.items[$uniqueId]?.accessories[accessoryId]?.total || 0)}
                </StyledButton>
              </StyledActionsContainer>
            )}
          </StyledRightWrapper>
        </StyledSubWrapper>
      </StyledContainer>
    </StyledDrawer>
  );
};

export default ModalCard;
