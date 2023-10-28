import { ICardPayload } from '@/types/cards';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ArrowForward } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { transientOptions } from '@/utils/transientOptions';
import { PageType } from '@/types/enums';
import useToPath from '@/hooks/useToPath';
import useSetBookingData from '@/hooks/useSetBookingData';
import useGetFeedQuery from '@/hooks/queries/FeedQuery/useGetFeedQuery';
import { commonQueryParamConfigMap } from '@/hooks/queries/useQuery';
import { extractFeedFilters } from '@/hooks/queries/FeedQuery/useSetFeedQuery';

const StyledButtonContainer = styled(Box)`
  display: flex;
  grid-gap: 8px;
  margin-bottom: 12px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
`;

const StyledLink = styled(Link, transientOptions)<{ $fullWidth?: boolean }>`
  text-decoration: none;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

type Props = {
  formBaseName: string;
  isUnavailable: boolean;
  withAppliedFilters: boolean;
  formattedCardDate: string | null;
  cardData: ICardPayload;
  onClickWaitlist: () => void;
};

const ButtonRow = ({
  formBaseName,
  isUnavailable,
  withAppliedFilters,
  formattedCardDate,
  cardData,
  onClickWaitlist,
}: Props) => {
  const { t } = useTranslation(['common', 'actions']);
  const { handleSetBookingData } = useSetBookingData({ name: formBaseName });
  const { parsedQuery } = useGetFeedQuery();
  const { toPath } = useToPath({ pageType: PageType.ITEM_DETAIL, paramConfigMap: commonQueryParamConfigMap });

  const buttonLabel = useMemo(() => {
    if (isUnavailable) return `${t('actions:joinTheWaitlist')} ${formattedCardDate}`;
    return `${t('actions:bookNow')} ${formattedCardDate}`;
  }, [formattedCardDate, isUnavailable, t]);

  const handleButtonClick = () => {
    handleSetBookingData({ date: cardData.date, dateRange: cardData.dateRange });
    if (isUnavailable) {
      onClickWaitlist();
    }
  };

  return (
    <StyledButtonContainer>
      {withAppliedFilters && (
        <StyledButton
          variant='contained'
          fullWidth
          endIcon={<ArrowForward color='action' />}
          onClick={() => handleButtonClick()}>
          {buttonLabel}
        </StyledButton>
      )}
      <StyledLink href={toPath({ id: cardData.id }, extractFeedFilters(parsedQuery))} $fullWidth={!withAppliedFilters}>
        <StyledButton
          sx={{ padding: '10px 19px', minWidth: 'none' }}
          {...(!withAppliedFilters ? { fullWidth: true, variant: 'contained' } : { variant: 'outlined' })}>
          {t('common:info')}
        </StyledButton>
      </StyledLink>
    </StyledButtonContainer>
  );
};

export default ButtonRow;
