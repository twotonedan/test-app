import useToPath from '@/hooks/useToPath';
import theme from '@/theme';
import { ICardPayload } from '@/types/cards';
import { CardComponentOption, PageType } from '@/types/enums';
import { Box, css, styled, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { transientOptions } from '@/utils/transientOptions';
import useGetFeedQuery from '@/hooks/queries/FeedQuery/useGetFeedQuery';
import { commonQueryParamConfigMap } from '@/hooks/queries/useQuery';
import { extractFeedFilters } from '@/hooks/queries/FeedQuery/useSetFeedQuery';
import Amenities from '../../Amenities';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInfoSection = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  width: 0;
  flex: 1;
  position: relative;
  ${theme.breakpoints.up('lg')} {
    width: 100%;
    margin-left: 0;
  }
`;

const StyledImage = styled(Image)`
  width: 140px;
  height: 140px;
  border-radius: 8px;
  object-fit: cover;
  ${theme.breakpoints.up('lg')} {
    width: 100%;
    height: 192px;
  }
`;

const StyledUnavailableDate = styled(Box)`
  padding: 3px 8px;
  border: 1px solid ${theme.palette.error.main};
  border-radius: 999px;
  width: fit-content;
  align-self: flex-end;
  margin-right: 8px;
  margin-bottom: -8px;
  ${theme.breakpoints.up('lg')} {
    position: absolute;
    top: 12px;
  }
`;

const StyledTypography = styled(Typography, transientOptions)<{ $hasLessLines?: boolean }>`
  max-height: 72px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: ${props => (props.$hasLessLines ? 3 : 4)};
  overflow-wrap: break-word;
  line-height: 19px;
  margin-bottom: unset;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  ${theme.breakpoints.up('md')} {
    margin-top: 8px;
  }
  ${theme.breakpoints.up('lg')} {
    margin-top: 12px;
  }
`;

const StyledSubtitle = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledLink = styled(Link, transientOptions)<{ $fullWidth?: boolean }>`
  text-decoration: none;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledSubWapper = styled(Box)`
  display: flex;
  width: 100%;
  margin-bottom: 12px;
  ${theme.breakpoints.up('lg')} {
    flex-direction: column;
  }
`;

const StyledBox = styled(Box)`
  margin-bottom: 12px;
  width: 100%;
`;

const StyledTopAmenities = styled(Amenities)`
  justify-content: unset;
  grid-template-columns: repeat(auto-fill, minmax(55px, auto));
  column-gap: 24px;
`;

const StyledBottomAmenities = styled(StyledTopAmenities)`
  padding: 0 8px;
  column-gap: 18px;
  ${theme.breakpoints.up('lg')} {
    padding-left: 0;
  }
`;

type Props = {
  isUnavailable?: boolean;
  cardData: ICardPayload;
  formattedCardDate?: string | null;
};

const TopSection = ({ isUnavailable, cardData, formattedCardDate }: Props) => {
  const { parsedQuery } = useGetFeedQuery();
  const { toPath } = useToPath({ pageType: PageType.ITEM_DETAIL, paramConfigMap: commonQueryParamConfigMap });

  const amenitiesData = cardData.amenities?.slice(0, 4);

  return (
    <StyledWrapper>
      <StyledLink href={toPath({ id: cardData.id }, extractFeedFilters(parsedQuery))} $fullWidth>
        <StyledSubWapper>
          <StyledImage src={cardData.image} alt={cardData.alt} />
          <StyledInfoSection>
            {isUnavailable && (
              <StyledUnavailableDate>
                <Typography
                  variant='subtitle2'
                  sx={{ color: theme.palette.error.main, textDecoration: 'line-through' }}>
                  {formattedCardDate}
                </Typography>
              </StyledUnavailableDate>
            )}
            <StyledTitle variant='h2'>{cardData.title}</StyledTitle>
            <StyledSubtitle variant='subtitle1' sx={{ lineHeight: '19px' }} mb='8px'>
              {cardData.tagline}
            </StyledSubtitle>
            {cardData.topSectionComponent === CardComponentOption.DESCRIPTION && (
              <StyledTypography $hasLessLines={isUnavailable} variant='subtitle1' paragraph>
                {cardData.description.text}
              </StyledTypography>
            )}

            {cardData.topSectionComponent === CardComponentOption.AMENITIES && amenitiesData && (
              <StyledTopAmenities amenities={amenitiesData} />
            )}
          </StyledInfoSection>
        </StyledSubWapper>
      </StyledLink>

      {cardData.bottomSectionComponent && (
        <StyledBox>
          {cardData.bottomSectionComponent === CardComponentOption.DESCRIPTION && (
            <StyledTypography $hasLessLines={isUnavailable} variant='subtitle1' paragraph>
              {cardData.description.text}
            </StyledTypography>
          )}
          {amenitiesData && cardData.bottomSectionComponent === CardComponentOption.AMENITIES && (
            <StyledBottomAmenities amenities={amenitiesData} />
          )}
        </StyledBox>
      )}
    </StyledWrapper>
  );
};

export default TopSection;
