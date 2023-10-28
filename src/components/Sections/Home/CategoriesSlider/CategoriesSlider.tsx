import { SupportedIcons } from '@/constants/icons/supportedIcons';
import useGetFeed from '@/hooks/api/useGetFeed';
import theme from '@/theme';
import { CategoryType } from '@/types/enums';
import { Box, styled } from '@mui/material';
import { isUndefined } from 'lodash';
import { ForwardedRef, forwardRef, memo, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Mousewheel, Swiper } from 'swiper';
import { Swiper as ReactSwiper, SwiperProps, SwiperSlide } from 'swiper/react';
import CategoryItem from './CategoryItem';

const StyledWrapper = styled(Box)`
  overflow: hidden;
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  justify-content: flex-start;

  > .swiper {
    max-width: 100%;
    width: 100%;
    overflow: visible;

    .swiper-slide {
      width: auto;

      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
`;

const swiperProps: SwiperProps = {
  modules: [Mousewheel],
  mousewheel: {
    forceToAxis: true,
  },
  slidesPerView: 'auto',
};

type Props = { name: string; categorySelected?: CategoryType; className?: string; onCategoryChange?: () => void };

const CategoriesSlider = (
  { name: baseName, categorySelected = CategoryType.ALL, onCategoryChange, className }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { data: feedData } = useGetFeed();

  const name = `${baseName}.category`;
  const { setValue, reset } = useFormContext();
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    const swiperEl = swiperRef.current;
    if (!swiperEl) return;

    const categoryIndex = feedData?.categories?.findIndex(category => category.type === categorySelected);
    if (categoryIndex === -1 || isUndefined(categoryIndex)) return;
    swiperEl.slideTo(categoryIndex);
  }, [categorySelected, feedData?.categories]);

  const handleCategoryUpdate = (categoryType: CategoryType) => {
    reset();
    if (categoryType === CategoryType.ALL) return setValue(name, undefined);
    setValue(name, categoryType);
    return onCategoryChange?.();
  };

  return (
    <StyledWrapper ref={ref} className={className}>
      <StyledInnerWrapper>
        <ReactSwiper
          onInit={s => {
            swiperRef.current = s;
          }}
          {...swiperProps}>
          {feedData?.categories?.map(category => {
            const isAllSelected = category.type === CategoryType.ALL && !categorySelected;
            const isCatSelected = categorySelected === category.type;
            return (
              <SwiperSlide key={category.id}>
                <CategoryItem
                  handleClick={() => handleCategoryUpdate(category.type)}
                  icon={SupportedIcons[category.icon]}
                  name={category.name}
                  isSelected={isCatSelected || isAllSelected}
                />
              </SwiperSlide>
            );
          })}
        </ReactSwiper>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default memo(forwardRef(CategoriesSlider));
