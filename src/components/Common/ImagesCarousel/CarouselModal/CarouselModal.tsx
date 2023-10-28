import NiceModal, { useModal, NiceModalHocProps } from '@ebay/nice-modal-react';
import { styled, Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import theme from '@/theme/theme';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Navigation, Zoom, Pagination } from 'swiper';
import CloseIcon from '@mui/icons-material/Close';

import { IImage } from '@/types/common';
import Image from 'next/image';

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    ${theme.mixins.layout};
    width: 100%;
    height: 100%;
    background-color: transparent;
    box-shadow: none;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  display: block;

  & .swiper-button-prev,
  .swiper-button-next {
    background-color: aquamarine;
    height: 56px;
    width: 56px;
    border-radius: 4px;
    padding: 12px;
    background: ${theme.palette.customText.primary};
    color: ${theme.palette.customColors.white};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  & .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 18px;
    font-weight: 900;
  }

  & .swiper-pagination-fraction {
    font-size: 18px;
    font-weight: 600;
    font-family: inherit;
    color: ${theme.palette.customColors.white};
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: ${theme.palette.customColors.white};
`;

const StyledImageContainer = styled(Box)`
  position: relative;
  width: 785px !important;
  height: 615px !important;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledDialogTitle = styled(DialogTitle)`
  margin-left: auto;
`;

interface Props extends NiceModalHocProps {
  imageList: IImage[];
}

const swiperProps: SwiperProps = {
  modules: [Zoom, Navigation, Pagination],
  loop: true,
  pagination: {
    type: 'fraction',
  },
  navigation: true,
};

const CarouselModal = NiceModal.create(({ imageList }: Props) => {
  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);

  return (
    <StyledDialog open={isOpen} onClose={handleOnClose}>
      <StyledDialogTitle>
        <IconButton onClick={() => handleOnClose()}>
          <StyledCloseIcon fontSize='large' />
        </IconButton>
      </StyledDialogTitle>
      <DialogContent>
        <StyledSwiper {...swiperProps}>
          {imageList.map(image => (
            <SwiperSlide key={image.id}>
              <div className='swiper-zoom-container'>
                <StyledImageContainer>
                  <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
                </StyledImageContainer>
              </div>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </DialogContent>
    </StyledDialog>
  );
});

export default CarouselModal;
