import theme from '@/theme/theme';
import { Box, Typography, styled } from '@mui/material';
import { IImage } from '@/types/common';
import Image from 'next/image';
import { useId, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { transientOptions } from '@/utils/transientOptions';
import { TagColor } from '@/types/enums';

import CarouselModal from './CarouselModal/CarouselModal';

const StyledWrapper = styled(Box, transientOptions)<{ $height?: number; $smallGap?: boolean }>`
  display: flex;
  height: ${props => props.$height}px;
  gap: ${props => (props.$smallGap ? '16px' : '24px')};
  position: relative;
`;

const StyledBoxList = styled(Box, transientOptions)<{ $smallGap?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${props => (props.$smallGap ? '12px' : '16px')};
`;

const StyledImageWrapper = styled(Box, transientOptions)<{ $width?: number; $height?: number }>`
  position: relative;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`;

const StyledImageItem = styled(Box)`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const StyledPlusLabel = styled('span')`
  position: absolute;
  height: 30px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(71, 79, 81, 0.8);
`;

const StyledTypographyLabel = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.palette.customColors.white};
  text-align: center;
`;

const StyledImageTag = styled(Box, transientOptions)<{ backgroundColor?: TagColor }>`
  position: absolute;
  top: 12px;
  right: 12px;
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

type Props = {
  images: IImage[];
  width?: number;
  height?: number;
  smallGap?: boolean;
  hasTag?: boolean;
  tagColor?: TagColor;
  tagLabel?: string;
  maxImages?: number;
  className?: string;
};

const MAX_IMAGES = 5;

const ImagesCarousel = ({
  images: imageList,
  width,
  height,
  smallGap,
  hasTag,
  tagColor,
  tagLabel,
  maxImages = MAX_IMAGES,
  className,
}: Props) => {
  const id = useId();
  const modalId = `carousel-images-modal-${id}`;
  const showImagesModal = () => NiceModal.show(modalId);
  const [selectedImage, setSelectedImage] = useState<IImage>(imageList[0]);

  return (
    <div className={className}>
      <StyledWrapper $height={height} $smallGap={smallGap}>
        {hasTag && (
          <StyledImageTag backgroundColor={tagColor}>
            <StyledImageLabel>{tagLabel}</StyledImageLabel>
          </StyledImageTag>
        )}
        {imageList.length > 1 && (
          <StyledBoxList $smallGap={smallGap}>
            {imageList.slice(0, maxImages).map((imageItem, index) => {
              const hasLabel = imageList.length > maxImages && index === maxImages - 1;
              return (
                <StyledImageItem
                  key={imageItem.id}
                  onClick={() => (hasLabel ? showImagesModal() : setSelectedImage(imageList[index]))}>
                  <Image src={imageItem.src} alt={imageItem.alt} fill style={{ objectFit: 'cover' }} />
                  {hasLabel && (
                    <StyledPlusLabel>
                      <StyledTypographyLabel>+ {imageList.length - maxImages}</StyledTypographyLabel>
                    </StyledPlusLabel>
                  )}
                </StyledImageItem>
              );
            })}
          </StyledBoxList>
        )}
        <StyledImageWrapper onClick={() => showImagesModal()} $width={width} $height={height}>
          <Image src={selectedImage.src} alt={selectedImage.alt} fill style={{ objectFit: 'cover' }} />
        </StyledImageWrapper>
      </StyledWrapper>
      <CarouselModal id={modalId} imageList={imageList} />
    </div>
  );
};

export default ImagesCarousel;
