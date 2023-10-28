import theme from '@/theme';
import { Box, styled } from '@mui/material';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { IImage } from '@/types/common';
import { transientOptions } from '@/utils/transientOptions';

const StyledWrapper = styled(Box, transientOptions)<{ $smallView?: boolean }>`
  width: 100%;
  position: relative;

  .swiper {
    border-radius: 12px;
    overflow: hidden;
    height: ${props => (props.$smallView ? '200px' : '248px')};
  }

  ${theme.breakpoints.up('md')} {
    width: 50%;

    .swiper {
      height: ${props => (props.$smallView ? '200px' : '368px')};
    }
  }
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

type Props = {
  images: IImage[];
  smallView?: boolean;
  className?: string;
};

const ImagesSwiper = ({ images, smallView, className }: Props) => {
  return (
    <StyledWrapper $smallView={smallView} className={className}>
      <StyledSwiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}>
        {images.map(image => {
          return (
            <SwiperSlide key={image.id}>
              <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
            </SwiperSlide>
          );
        })}
      </StyledSwiper>
    </StyledWrapper>
  );
};

export default ImagesSwiper;
