import theme from '@/theme/theme';
import { ICardPayload } from '@/types/cards';
import { Box, Typography, styled } from '@mui/material';
import Image from 'next/image';

const StyledDetail = styled(Box)`
  ${theme.breakpoints.down('md')} {
    ${theme.mixins.layout};
  }

  display: flex;
  width: 100%;
  margin: 8px auto 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${theme.palette.customColors.gray};

  ${theme.breakpoints.up('md')} {
    margin-top: 16px;
  }
`;

const StyledImageWrapper = styled(Box)`
  width: 140px;
  height: 140px;
  position: relative;

  ${theme.breakpoints.up('md')} {
    width: 236px;
    height: 192px;
  }
`;

const StyledInfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  width: 0;
  flex: 1;
`;

const StyledSubtitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDescription = styled(Typography)`
  max-height: 72px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  overflow-wrap: break-word;
  line-height: 19px;
  margin-bottom: unset;
`;

type CardDetailProps = {
  cardData: ICardPayload;
};

const CardDetail = ({ cardData }: CardDetailProps) => {
  return (
    <StyledDetail>
      <StyledImageWrapper>
        <Image src={cardData.image} alt={cardData.alt} fill style={{ borderRadius: '8px', objectFit: 'cover' }} />
      </StyledImageWrapper>
      <StyledInfoSection>
        <Typography variant='h2' fontWeight={600} mt='8px'>
          {cardData.title}
        </Typography>
        <StyledSubtitle variant='subtitle1' sx={{ lineHeight: '19px' }} mb='8px'>
          {cardData.tagline}
        </StyledSubtitle>

        <StyledDescription variant='subtitle1' paragraph>
          {cardData.description.text}
        </StyledDescription>
      </StyledInfoSection>
    </StyledDetail>
  );
};

export default CardDetail;
