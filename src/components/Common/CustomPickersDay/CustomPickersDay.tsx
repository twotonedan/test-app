import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { transientOptions } from '@/utils/transientOptions';

const StyledWrapper = styled('div')`
  :not(:last-of-type) {
    width: 100%;
  }

  &.Mui-selected > .inner-wrapper {
    border-radius: 500px;
  }

  &.Mui-selected-range,
  &.Mui-selected-range:hover,
  &.Mui-selected-range:focus {
    > .inner-wrapper {
      width: 100%;
      position: relative;
      background-color: ${theme.palette.customColors.barelyBlue};

      &::after {
        content: '';
        height: 100%;
        width: 100%;
        background: ${theme.palette.customColors.barelyBlue};
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
      }
    }

    &.Mui-selected {
      &-start > .inner-wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &-end > .inner-wrapper {
        width: fit-content;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        &::after {
          display: none;
        }
      }
    }

    &:first-of-type,
    &.Mui-selected-month-start {
      > .inner-wrapper {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
    }

    &:last-of-type,
    &.Mui-selected-month-end {
      > .inner-wrapper {
        width: fit-content;
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;

        &::after {
          display: none;
        }
      }
    }

    &.Mui-selected-unavailable > .inner-wrapper {
      &,
      &::after {
        background-color: ${theme.palette.customColors.lightGray};
      }
    }
  }
`;

const StyledInnerWrapper = styled('div')`
  width: fit-content;
`;

const StyledPickersDay = styled(PickersDay, transientOptions)<{
  $isDaySelected?: boolean;
  $isHoliday?: boolean;
  $isUnavailable?: boolean;
  $isInsideUnavailableSelection?: boolean;
}>`
  width: 48px;
  height: 48px;
  transition: background-color 0.1s;
  margin: unset;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ $isHoliday }) =>
    $isHoliday &&
    css`
      color: ${theme.palette.customColors.strongLightBlue};

      .day-text {
        ::before {
          content: '*';
          visibility: hidden;
        }
      }
    `}

  ${({ $isDaySelected, $isUnavailable, $isInsideUnavailableSelection }) =>
    $isDaySelected &&
    css`
      color: #fff;
      background-color: ${theme.palette.primary.main};

      .day-text {
        font-weight: 500;
      }

      &:hover,
      &:focus {
        background-color: ${theme.palette.customColors.lapisLazuli};
      }

      ${($isUnavailable || $isInsideUnavailableSelection) &&
      css`
        &,
        &:hover,
        &:focus {
          background-color: ${theme.palette.customColors.gray};
        }
      `}
    `}

  ${({ $isInsideUnavailableSelection, $isHoliday }) =>
    $isInsideUnavailableSelection &&
    !$isHoliday &&
    css`
      color: ${theme.palette.customText.secondary};
    `}

  ${({ $isUnavailable }) =>
    $isUnavailable &&
    css`
      color: ${theme.palette.error.main};
      text-decoration: line-through;
    `}
`;

const StyledDayText = styled('span')`
  font-size: 14px;
  font-weight: inherit;
  line-height: 20px;
`;

const StyledPriceText = styled('span')`
  margin-top: -4px;
  font-weight: unset;
  font-size: 10px;
  line-height: 16px;
  min-height: 1em;
`;

type Props = PickersDayProps<unknown> & {
  isDaySelected?: boolean;
  isHoliday?: boolean;
  isUnavailable?: boolean;
  withPrices?: boolean;
  price?: number;
  className?: string;
};

const CustomPickersDay = ({
  className,
  isDaySelected,
  isHoliday,
  isUnavailable,
  withPrices,
  price,
  ...props
}: Props) => {
  const { shortCurrencyFormatter } = useCurrencyFormatter();
  const shouldShowHoliday = isHoliday && !isUnavailable;
  const shouldShowUnavailable = !props.disabled && isUnavailable;
  const shouldShowPrice = !props.disabled && !isUnavailable;

  return (
    <StyledWrapper className={className}>
      <StyledInnerWrapper className='inner-wrapper'>
        <StyledPickersDay
          $isDaySelected={isDaySelected}
          $isHoliday={shouldShowHoliday}
          $isUnavailable={shouldShowUnavailable}
          $isInsideUnavailableSelection={className?.includes('Mui-selected-unavailable')}
          className='day-button-picker'
          {...props}>
          <StyledDayText className='day-text'>
            {format(props.day as Date, 'd')}
            {shouldShowHoliday ? <span>*</span> : ''}
          </StyledDayText>
          {withPrices && (
            <StyledPriceText className='day-price-text'>
              {shouldShowPrice && (price ? shortCurrencyFormatter.format(price) : '-')}
            </StyledPriceText>
          )}
        </StyledPickersDay>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default CustomPickersDay;
