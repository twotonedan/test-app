import SmallItemCard from '@/components/Common/SmallItemCard';
import InfoButton from '@/components/Common/SmallItemCard/InfoButton';
import useToPath from '@/hooks/useToPath';
import { ICardPayload } from '@/types/cards';
import theme from '@/theme';
import { PageType } from '@/types/enums';
import { Box, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { Mousewheel } from 'swiper';
import { SwiperProps, Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { transientOptions } from '@/utils/transientOptions';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  padding-bottom: 42px;
  min-height: 300px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  line-height: 26px;
`;

const StyledInnerWrapper = styled(Box, transientOptions)<{ $smallView?: boolean }>`
  display: flex;
  justify-content: flex-start;
  margin-top: 12px;

  & > .swiper {
    max-width: 100%;
    width: 100%;
    overflow: visible;

    .swiper-slide {
      width: 100%;
      max-width: 197px;

      ${theme.breakpoints.up('lg')} {
        max-width: ${props => (props.$smallView ? '342px' : '400px')};
      }

      &:not(:last-child) {
        margin-right: 16px;
        ${theme.breakpoints.up('md')} {
          margin-right: 24px;
        }
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

type Props = {
  title: string;
  items: Array<ICardPayload>;
  onClick?: () => void;
  className?: string;
  smallView?: boolean;
};

const RecommendedItems = ({ title, items, onClick, className, smallView = false }: Props) => {
  const { toPath } = useToPath({ pageType: PageType.ITEM_DETAIL });

  return (
    <StyledWrapper className={className}>
      <StyledTitle variant='h2'>{title}</StyledTitle>
      <StyledInnerWrapper $smallView={smallView}>
        <ReactSwiper {...swiperProps}>
          {items.map(data => (
            <SwiperSlide key={data.id}>
              <StyledLink href={toPath({ id: data.id })} onClick={onClick}>
                <SmallItemCard
                  tag={data.tag}
                  image={data.image}
                  alt={data.alt}
                  smallView={smallView}
                  title={data.title}
                  subTitle={data.tagline}
                  bottomComponent={<InfoButton />}
                />
              </StyledLink>
            </SwiperSlide>
          ))}
        </ReactSwiper>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default RecommendedItems;
