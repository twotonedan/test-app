import theme from '@/theme';
import { TagColor } from '@/types/enums';
import { Box, styled, Typography } from '@mui/material';
import { transientOptions } from '@/utils/transientOptions';
import Image, { StaticImageData } from 'next/image';
import { memo, ReactNode } from 'react';

const StyledWrapper = styled(Box, transientOptions)<{ $isHighlighted?: boolean; $smallView?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 7px 7px 11px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  width: 100%;
  max-width: 197px;
  box-sizing: border-box;
  border: 1px solid ${props => (props.$isHighlighted ? theme.palette.primary.main : theme.palette.common.white)};
  transition: all ease-out 0.1s;
  cursor: pointer;
  ${theme.breakpoints.up('lg')} {
    width: ${props => (props.$smallView ? '342px' : '400px')};
    max-width: ${props => (props.$smallView ? '342px' : '400px')};
    padding: 16px 16px 11px;
  }
`;

const StyledImageTag = styled(Box, transientOptions)<{ backgroundColor: TagColor }>`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  background: ${props => props.backgroundColor};
  opacity: 1;
  border-radius: 999px;
  max-height: 24px;
  z-index: 1;
`;

const StyledImageLabel = styled(Typography)`
  font-weight: 600;
  font-size: 10px;
  color: ${theme.palette.common.white};
  margin-bottom: 2px;
`;

const StyledTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 8px 4px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: auto;
`;

const StyledImageWrapper = styled(Box)<{ $smallView?: boolean }>`
  position: relative;
  height: 128px;

  .card-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  ${theme.breakpoints.up('lg')} {
    width: ${props => (props.$smallView ? '310px' : '368px')};
    height: 196px;
  }
`;

const StyledSubtitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: auto;
`;

type Props = {
  tag: {
    label: string;
    color: TagColor;
  };
  image: StaticImageData;
  alt: string;
  title: string;
  subTitle: string;
  bottomComponent: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  isHighlighted?: boolean;
  smallView: boolean;
};

const SmallItemCard = ({
  tag,
  image,
  alt,
  title,
  subTitle,
  onClick,
  bottomComponent,
  isHighlighted,
  smallView,
}: Props) => {
  return (
    <StyledWrapper component='article' $isHighlighted={isHighlighted} $smallView={smallView} onClick={onClick}>
      <StyledImageWrapper $smallView={smallView}>
        <StyledImageTag backgroundColor={tag.color}>
          <StyledImageLabel>{tag.label}</StyledImageLabel>
        </StyledImageTag>
        <Image className='card-img' src={image} alt={alt} />
      </StyledImageWrapper>

      <StyledTextWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle variant='label'>{subTitle}</StyledSubtitle>
      </StyledTextWrapper>
      {bottomComponent}
    </StyledWrapper>
  );
};

export default memo(SmallItemCard);
