import theme from '@/theme/theme';
import { Box, Skeleton, Typography, styled } from '@mui/material';
import { useWatch } from 'react-hook-form';
import useGetItemAvailability from '@/hooks/api/useGetItemAvailability';
import { IDateRangeCalendarInfo } from '@/types/common';
import ShowMore from './ShowMore';
import DateSuggestionButton from './DateSuggestionButton';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 12px 0 8px;
  grid-gap: 8px;
`;

const StyledButtonWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  color: ${theme.palette.customText.secondary};
  margin-left: 4px;
`;

type Props = {
  title: string;
  formBaseName: string;
  isSingleDate: boolean;
  className?: string;
  limit?: number;
  showMore?: boolean;
  calendarInfo: IDateRangeCalendarInfo;
};

const OtherDatesList = ({ title, formBaseName, isSingleDate, limit, className, showMore, calendarInfo }: Props) => {
  const date = useWatch({ name: `${formBaseName}.${isSingleDate ? 'date' : 'dateRange'}` });
  const { availability = [], isLoading } = useGetItemAvailability({ isSingleDate, limit, selectedDate: date });
  // console.log('here', availability, isLoading)
  return (
    <StyledWrapper className={className}>
      <StyledTypography variant='h4'>{title}</StyledTypography>
      <StyledButtonWrapper>
        {!isLoading && availability?.length
          ? availability?.map(dateData => (
              <DateSuggestionButton
                key={dateData.id}
                data={dateData}
                formBaseName={formBaseName}
                calendarInfo={calendarInfo}
              />
            ))
          : limit &&
            Array.from({ length: limit }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton variant='rounded' width='70%' height={32} key={`${limit}-${i}`} />
            ))}
      </StyledButtonWrapper>
      {showMore && <ShowMore isSingleDate={isSingleDate} formBaseName={formBaseName} calendarInfo={calendarInfo} />}
    </StyledWrapper>
  );
};

export default OtherDatesList;
