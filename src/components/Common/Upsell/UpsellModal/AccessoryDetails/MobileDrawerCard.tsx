import theme from '@/theme/theme';
import { TagColor } from '@/types/enums';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Button, Drawer, IconButton, Typography, styled } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Pagination } from 'swiper';
import QuantityCounter from '@/components/Common/QuantityCounter/QuantityCounter';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { IImage, IQuantityLimits } from '@/types/common';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useTranslation } from 'next-i18next';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import { ILocation } from '@/types/accessories';
import EditLocationButton from '../EditLocationButton';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    border-radius: 16px 16px 0px 0px;
    ${theme.mixins.layout}
    padding: 0;
  }
`;

const StyledContainer = styled(Box)`
  padding: 0;
  background: ${theme.palette.customColors.white};

  .swiper {
    overflow: hidden;
    height: 200px;
  }
  position: relative;
`;

const StyledImageTag = styled(Box, transientOptions)<{ backgroundColor: TagColor | undefined }>`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  background: ${props => props.backgroundColor};
  opacity: 1;
  border-radius: 999px;
  max-height: 24px;
  z-index: 2;
`;

const StyledImageLabel = styled(Typography)`
  font-weight: 600;
  font-size: 10px;
  color: ${theme.palette.common.white};
  margin-bottom: 2px;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    opacity: 1;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(4px);
  }

  .swiper-pagination-bullet-active {
    background-color: ${theme.palette.common.white};
    width: 8px;
    height: 8px;
    margin-bottom: -1px !important;
  }
`;

const StyledTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 24px 16px;
`;

const StyledTextWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledTextTitle = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 4px;
`;

const StyledLabel = styled(Typography)`
  font-size: 16px;
`;

const StyledTitleDescription = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
`;

const StyledActionsContainer = styled(Box)`
  margin-top: 40px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
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

const MobileDrawerCard = ({
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

  const handleAddWithLocation = () => {
    if (locations && !selectedLocation) {
      handleShowLocationModal();
    } else {
      onClose();
    }
  };

  return (
    <StyledDrawer anchor='bottom' open={isOpen} onClose={onClose}>
      <StyledContainer>
        {hasTag && (
          <StyledImageTag backgroundColor={tag?.color}>
            <StyledImageLabel>{tag?.label}</StyledImageLabel>
          </StyledImageTag>
        )}
        <StyledSwiper
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}>
          {images.map(image => {
            return (
              <SwiperSlide key={image.alt}>
                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
              </SwiperSlide>
            );
          })}
        </StyledSwiper>
        <StyledTextContainer>
          <StyledTextWrapper>
            <StyledTextTitle>
              <StyledTitle variant='h2'>{currencyFormatter.format(price)}</StyledTitle>
              <StyledLabel variant='label'>{title}</StyledLabel>
            </StyledTextTitle>
            <IconButton aria-label='share'>
              <ShareOutlinedIcon />
            </IconButton>
          </StyledTextWrapper>
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
        </StyledTextContainer>
      </StyledContainer>
    </StyledDrawer>
  );
};

export default MobileDrawerCard;
