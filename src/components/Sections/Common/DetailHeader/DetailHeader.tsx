import { ArrowBackIcon, CartIcon } from '@/assets';
import StickyHeader from '@/components/Common/StickyHeader/StickyHeader';
import { useCartData } from '@/hooks/contexts/useCartData';
import theme from '@/theme';
import { Badge, IconButton, styled, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';
import { ReactNode, RefObject, useMemo } from 'react';

const StyledBadge = styled(Badge)`
  > .MuiBadge-badge {
    background-color: ${theme.palette.customColors.orangeCarrot};
    color: ${theme.palette.common.white};
    transform: scale(1) translate(0, -40%);
  }
`;

const StyledStickyHeader = styled(StickyHeader)`
  ${theme.mixins.layout};
`;

type Props = {
  title: string;
  href?: string;
  onClickBack?: () => void;
  onClickCart?: () => void;
  className?: string;
  parentRef?: RefObject<HTMLElement>;
  rightComponent?: ReactNode;
};

const DetailHeader = ({ title, href, onClickBack, onClickCart, className, parentRef, rightComponent }: Props) => {
  const { cartLength } = useCartData();

  const backButton = useMemo(() => {
    const button = (
      <IconButton onClick={onClickBack}>
        <SvgIcon component={ArrowBackIcon} inheritViewBox />
      </IconButton>
    );

    if (!href) return button;

    return (
      <Link href={href} passHref>
        {button}
      </Link>
    );
  }, [href, onClickBack]);

  return (
    <StyledStickyHeader
      className={className}
      leftComponent={backButton}
      middleComponent={<Typography variant='h1'>{title}</Typography>}
      rightComponent={
        rightComponent ?? (
          <IconButton onClick={onClickCart}>
            <StyledBadge badgeContent={cartLength}>
              <SvgIcon component={CartIcon} inheritViewBox />
            </StyledBadge>
          </IconButton>
        )
      }
      parentRef={parentRef}
    />
  );
};

export default DetailHeader;
