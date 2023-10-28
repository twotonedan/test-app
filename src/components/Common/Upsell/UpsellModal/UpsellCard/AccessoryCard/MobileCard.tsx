import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import theme from '@/theme/theme';
import { IAccessory } from '@/types/accessories';
import { TagColor } from '@/types/enums';
import { transientOptions } from '@/utils/transientOptions';
import { DeleteOutline } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import Image from 'next/image';

const StyledMobileWrapper = styled(Box, transientOptions)<{ $isHighlighted?: boolean }>`
  position: relative;
  display: flex;
  padding: 8px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${props => (props.$isHighlighted ? theme.palette.primary.main : theme.palette.common.white)};
  transition: all ease-out 0.1s;
  cursor: pointer;
  column-gap: 6px;
`;

const StyledMobileImageWrapper = styled(Box)`
  position: relative;
  height: 104px;
  width: 104px;

  .card-img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  ${theme.breakpoints.up('lg')} {
    height: 166px;
    width: 166px;
  }
`;

const StyledImageTag = styled(Box, transientOptions)<{ backgroundColor: TagColor }>`
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

const StyledMobileTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 8px 4px;
`;

const StyledMobileTitle = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: auto;

  ${theme.breakpoints.up('lg')} {
    font-size: 18px;
  }
`;

const StyledMobileSubtitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: auto;

  ${theme.breakpoints.up('lg')} {
    font-size: 14px;
  }
`;

const StyledMobileBottomRightWrapper = styled(Box)`
  position: absolute;
  bottom: 8px;
  right: 12px;
`;

const StyledMobileTrashButton = styled(IconButton)`
  position: absolute;
  top: 20px;
  right: 20px;

  svg {
    color: ${theme.palette.error.main};
  }
`;

type Props = {
  accessory: IAccessory;
  price: string;
  hasTag?: boolean;
  isHighlighted?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  showTrashIcon?: boolean;
  accessoryHandlerComponent?: React.ReactNode;
  hidePricing?: boolean;
};

const MobileCard = ({
  accessory,
  price,
  hasTag,
  isHighlighted,
  handleClick,
  showTrashIcon,
  accessoryHandlerComponent,
  hidePricing,
}: Props) => {
  const { handleRemoveAllAccessoryQuantity } = useCurrentCartItem();

  const handleRemoveAccessory = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleRemoveAllAccessoryQuantity(accessory.id);
  };
  return (
    <StyledMobileWrapper component='article' $isHighlighted={isHighlighted} onClick={handleClick}>
      <StyledMobileImageWrapper>
        {hasTag && (
          <StyledImageTag backgroundColor={accessory.tag.color}>
            <StyledImageLabel>{accessory.tag.label}</StyledImageLabel>
          </StyledImageTag>
        )}
        <Image className='card-img' src={accessory.imagesDetail[0].src} alt={accessory.imagesDetail[0].alt} />
      </StyledMobileImageWrapper>
      <StyledMobileTextWrapper>
        <StyledMobileTitle>{accessory.title}</StyledMobileTitle>
        <StyledMobileSubtitle variant='label'>{price}</StyledMobileSubtitle>
      </StyledMobileTextWrapper>
      {!hidePricing && <StyledMobileBottomRightWrapper>{accessoryHandlerComponent}</StyledMobileBottomRightWrapper>}
      {showTrashIcon && (
        <StyledMobileTrashButton onClick={e => handleRemoveAccessory(e)}>
          <DeleteOutline fontSize='small' />
        </StyledMobileTrashButton>
      )}
    </StyledMobileWrapper>
  );
};

export default MobileCard;
