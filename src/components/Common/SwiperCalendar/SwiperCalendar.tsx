/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';
import { PickersDayProps, StaticDatePicker } from '@mui/x-date-pickers';
import { startOfMonth, addMonths, endOfMonth } from 'date-fns';
import { noop } from 'lodash';
import { memo, useDeferredValue, useMemo } from 'react';
import { Mousewheel, Virtual, Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import theme from '@/theme/theme';
import { useElementSize } from 'usehooks-ts';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  ${theme.breakpoints.up('lg')} {
    height: 418px;
    width: 904px;
    padding: 8px 24px;
    background: ${theme.palette.common.white};
  }
`;

const StyledSwiper = styled(Swiper)`
  display: flex;
  flex-direction: column;
  height: 0;
  flex-grow: 1;
  overflow: hidden;
  width: 100%;

  ${theme.breakpoints.up('lg')} {
    flex-direction: row;
    height: unset;
    flex-grow: unset;
    overflow: unset;

    .swiper-wrapper {
      width: 100%;
      display: flex;
    }

    .swiper-slide-prev {
      margin-right: 12px;
    }

    .swiper-slide-visible {
      margin-right: 24px;
    }
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  width: 100%;
  box-sizing: unset;

  ${theme.breakpoints.up('lg')} {
    max-width: 416px;
    width: 100%;
    box-sizing: unset;
  }
`;

const StyledStaticDatePicker = styled(StaticDatePicker)`
  .MuiCalendarOrClockPicker-root > div,
  .MuiCalendarPicker-root {
    width: 100%;
    max-height: unset;
    overflow: unset;
  }

  .MuiPickerStaticWrapper-content {
    min-width: unset;
  }

  .MuiDayPicker-monthContainer {
    position: relative;
  }

  .MuiPickersCalendarHeader-root {
    padding: 0 16px;
    margin-bottom: 8px;

    ${theme.breakpoints.up('lg')} {
      padding: 8px 16px;
      margin: 0;
    }
  }

  .MuiPickersArrowSwitcher-root {
    display: none;
  }

  .MuiDayPicker-header {
    display: none;

    ${theme.breakpoints.up('lg')} {
      display: unset;

      .MuiTypography-root {
        color: ${theme.palette.customText.primary};
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
      }
    }
  }

  ${theme.breakpoints.up('lg')} {
    .MuiDayPicker-header {
      padding: 4px 0;
      display: flex;
      grid-gap: 8px;

      .MuiTypography-root {
        padding: 10px 14px;
        max-width: 20px;
        max-height: 22px;
      }
    }
  }

  ${theme.breakpoints.up('md')} {
    && .Mui-selected-range,
    && .Mui-selected-range:hover {
      ::after {
        width: 70px;
      }
    }
  }

  div[role='row'] {
    margin: 3px 0;
    justify-content: space-between;

    &:first-of-type {
      margin-top: unset;
    }

    &:last-of-type {
      margin-bottom: unset;
    }
  }
`;

const StyledArrows = styled(IconButton)`
  &.swiper-button-prev {
    display: none;
  }

  &.swiper-button-next {
    display: none;
  }

  ${theme.breakpoints.up('lg')} {
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0px 2px 4px 0px rgba(42, 51, 60, 0.16);
    background-color: ${theme.palette.common.white};

    :hover {
      background-color: ${theme.palette.common.white};
    }

    &.swiper-button-prev,
    &.swiper-button-next {
      display: initial;

      ::after {
        color: ${theme.palette.customText.primary};
        font-size: 18px;
        font-weight: 600;
        text-rendering: auto;
      }
    }

    &.swiper-button-prev {
      right: unset !important;
      left: -16px !important;
    }

    &.swiper-button-next {
      right: -16px !important;
      left: unset !important;
    }

    &.swiper-button-disabled {
      display: none;
    }
  }
`;

const CALENDAR_HEIGHT_PX = 315;

type Props = {
  handleOnChangeCalendar: (value: Date) => void;
  handleRenderDay: (currentDay: Date, pickersDayProps: PickersDayProps<unknown>) => JSX.Element;
  initialMinDate: Date | number;
  monthsQuantity: number;
  className?: string;
  useDesktopMode?: boolean;
};

const SwiperCalendar = ({
  className,
  handleOnChangeCalendar,
  handleRenderDay,
  initialMinDate,
  monthsQuantity,
  useDesktopMode,
}: Props) => {
  const [calendarWrapperRef, { height }] = useElementSize<HTMLElement>();
  const deferredHeight = useDeferredValue(height);

  const slidesPerView = useMemo(() => {
    if (useDesktopMode) return 2;
    if (deferredHeight) return deferredHeight / CALENDAR_HEIGHT_PX;
    return 1;
  }, [deferredHeight, useDesktopMode]);

  const swiperProps: SwiperProps = useMemo(
    () => ({
      modules: [Mousewheel, Virtual, Navigation],
      slidesPerView,
      direction: useDesktopMode ? 'horizontal' : 'vertical',
      mousewheel: true,
      virtual: true,
      navigation: {
        enabled: useDesktopMode,
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }),
    [slidesPerView, useDesktopMode]
  );

  const monthsToRender = useMemo(() => {
    const startDate = startOfMonth(initialMinDate);
    return [...new Array(monthsQuantity)].map((m, i) => {
      const min = addMonths(startDate, i);
      const max = endOfMonth(min);

      return { min, max };
    });
  }, [initialMinDate, monthsQuantity]);

  return (
    <StyledWrapper className={className}>
      <StyledArrows className='swiper-button-prev' />
      <StyledArrows className='swiper-button-next' />
      <StyledSwiper onInit={swiper => calendarWrapperRef(swiper.el)} {...swiperProps}>
        {(useDesktopMode || deferredHeight) &&
          monthsToRender.map(({ min, max }, i) => {
            return (
              <StyledSwiperSlide key={`calendar-range-${min}`} virtualIndex={i}>
                <StyledStaticDatePicker
                  // @ts-ignore
                  renderInput={noop}
                  value={null}
                  views={['day']}
                  displayStaticWrapperAs='desktop'
                  minDate={min}
                  maxDate={max}
                  defaultCalendarMonth={min}
                  onChange={v => handleOnChangeCalendar(v as Date)}
                  renderDay={(day, __, props) => handleRenderDay(day as Date, props)}
                  disableHighlightToday={!!i}
                  disablePast
                />
              </StyledSwiperSlide>
            );
          })}
      </StyledSwiper>
    </StyledWrapper>
  );
};

export default memo(SwiperCalendar);
