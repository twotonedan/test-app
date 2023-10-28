import theme from '@/theme/theme';
import { IImage } from '@/types/common';
import { TagColor } from '@/types/enums';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const StyledImageWrapper = styled(Box)`
  position: relative;
`;

const StyledImageTag = styled(Box, transientOptions)<{ backgroundColor?: TagColor }>`
  position: absolute;
  top: 8px;
  right: 4px;
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
  overflow: hidden;
  height: 245px;
  width: 245px;
  border-radius: 16px;

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

type Props = {
  images: IImage[];
  hasTag?: boolean;
  tagColor?: TagColor;
  tagLabel?: string;
};

const AccessorySwiper = ({ images, hasTag, tagColor, tagLabel }: Props) => {
  return (
    <StyledImageWrapper>
      {hasTag && (
        <StyledImageTag backgroundColor={tagColor}>
          <StyledImageLabel>{tagLabel}</StyledImageLabel>
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
    </StyledImageWrapper>
  );
};

export default AccessorySwiper;
