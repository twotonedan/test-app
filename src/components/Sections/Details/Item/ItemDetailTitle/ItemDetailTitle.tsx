import { ShareIcon } from '@/assets';
import theme from '@/theme';
import { Box, IconButton, styled, SvgIcon, Typography } from '@mui/material';
import copy from 'copy-to-clipboard';

const StyledWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  ${theme.breakpoints.up('md')} {
    margin-top: 7px;
    margin-bottom: 16px;
  }
`;

const StyledTitleWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  line-height: 26px;
`;

const StyledSubtitle = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;

const StyledIconButton = styled(IconButton)`
  background-color: ${theme.palette.customColors.lightGray};
  width: 40px;
  height: 40px;

  ${theme.breakpoints.up('lg')} {
    top: 12px;
  }
`;

type Props = {
  tagline: string;
  itemName: string;
  className?: string;
};

const ItemDetailTitle = ({ tagline, itemName, className }: Props) => {
  return (
    <StyledWrapper component='section' className={className}>
      <StyledTitleWrapper>
        <StyledTitle variant='h2' className='itemDetail-title'>
          {tagline}
        </StyledTitle>
        <StyledSubtitle className='itemDetail-subtitle'>{itemName}</StyledSubtitle>
      </StyledTitleWrapper>
      <StyledIconButton onClick={() => copy(window.location.href)}>
        <SvgIcon component={ShareIcon} inheritViewBox sx={{ fontSize: '18px' }} />
      </StyledIconButton>
    </StyledWrapper>
  );
};

export default ItemDetailTitle;
