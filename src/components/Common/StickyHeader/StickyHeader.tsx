/* eslint-disable consistent-return */
import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, styled } from '@mui/material';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';

const StyledShadowBox = styled(Box, transientOptions)<{ $showShadow?: boolean }>`
  ${props => props.$showShadow && 'box-shadow: 0px 1px 4px rgba(42, 51, 60, 0.16);'}
  position: sticky;
  top: 0;
  z-index: 3;
  background: ${theme.palette.common.white};
  width: 100%;
`;

const StyledWrapper = styled(Box, transientOptions)<{ $showShadow?: boolean }>`
  padding-top: 20px;
  padding-bottom: 19px;
  transition: all ease-out 0.1s;
  margin-bottom: 1px;
`;

const StyledInnerWrapper = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLeftRightWrapper = styled(Box)`
  :first-of-type {
    justify-content: flex-start;
    max-width: max-content;
  }

  :last-of-type {
    justify-content: flex-end;
  }

  :first-of-type,
  :last-of-type {
    display: flex;
    flex-basis: 50%;
    flex-shrink: 1;
    max-width: max-content;
  }
`;

const StyledMiddleWrapper = styled(Box)`
  flex-grow: 1;
  flex-shrink: 0;
  max-width: max-content;
`;

type Props = {
  leftComponent?: ReactNode;
  middleComponent?: ReactNode;
  rightComponent?: ReactNode;
  className?: string;
  parentRef?: RefObject<HTMLElement>;
  withShadow?: boolean;
  disabledShadow?: boolean;
};

const StickyHeader = ({
  leftComponent,
  middleComponent,
  rightComponent,
  className,
  parentRef,
  withShadow,
  disabledShadow,
}: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showShadow, setShowShadow] = useState(withShadow);

  useEffect(() => {
    const parent = parentRef?.current ?? window;

    if (!parent) return;

    const handleScroll = () => {
      if (withShadow) {
        setShowShadow(true);
      } else {
        const scrollPosition = 'scrollTop' in parent ? parent.scrollTop : parent.scrollY;
        setShowShadow(scrollPosition > 1);
      }
    };

    handleScroll();

    parent.addEventListener('scroll', handleScroll);
    return () => {
      parent.removeEventListener('scroll', handleScroll);
    };
  }, [parentRef, withShadow]);

  return (
    <StyledShadowBox className={className} $showShadow={!disabledShadow && showShadow}>
      <StyledWrapper ref={ref} className='stickyHeader-innerWrapper'>
        <StyledInnerWrapper>
          <StyledLeftRightWrapper>{leftComponent}</StyledLeftRightWrapper>
          <StyledMiddleWrapper>{middleComponent}</StyledMiddleWrapper>
          <StyledLeftRightWrapper>{rightComponent}</StyledLeftRightWrapper>
        </StyledInnerWrapper>
      </StyledWrapper>
    </StyledShadowBox>
  );
};

export default StickyHeader;
