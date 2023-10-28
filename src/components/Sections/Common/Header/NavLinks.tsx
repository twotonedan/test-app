import useGetCompany from '@/hooks/api/useGetCompany';
import Link from 'next/link';
import { Badge, Box, IconButton, SvgIcon, Typography, styled } from '@mui/material';
import { useCartData } from '@/hooks/contexts/useCartData';
import { CartIcon } from '@/assets';
import { useTranslation } from 'next-i18next';
import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';

import UserLoginButton from './UserLoginButton';

const StyledRightWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledNavLinksWrapper = styled(Box)`
  display: flex;
  gap: 16px;
  width: max-content;

  a {
    text-decoration: none;
  }
`;

const StyledNavLink = styled(Typography)`
  padding: 10px 16px;
  color: ${theme.palette.customText.secondary};
  min-width: max-content;

  &:hover {
    color: ${theme.palette.customText.primary};
  }
`;

const StyledCartButton = styled(IconButton)``;

const StyledBadge = styled(Badge, transientOptions)<{ $isDisabled?: boolean }>`
  > .MuiBadge-badge {
    background-color: ${props =>
      props.$isDisabled ? theme.palette.action.disabled : theme.palette.customColors.orangeCarrot};
    color: ${theme.palette.common.white};
    transform: scale(1) translate(0, -40%);
  }

  & .MuiSvgIcon-root {
    color: ${props => (props.$isDisabled ? theme.palette.action.disabled : theme.palette.customText.primary)};
  }
`;

type Props = {
  onLinksClick?: () => void;
  onCartClick?: () => void;
  disabledCart?: boolean;
};

const NavLinks = ({ onLinksClick, onCartClick, disabledCart }: Props) => {
  const { data: companyData } = useGetCompany();
  const { cartLength } = useCartData();
  const { t } = useTranslation();

  const authRequiredOptions = companyData?.header.menuOptions
    .filter(section => section.requiredAuth)
    .flatMap(section => section.options);

  return (
    <StyledRightWrapper>
      <StyledNavLinksWrapper>
        {companyData?.header.menuOptions.map(section => {
          if (!section.requiredAuth) {
            return section.options.map(option => (
              <Link href={onLinksClick ? '#' : option.path} onClick={onLinksClick} key={option.text}>
                <StyledNavLink variant='subtitle2' fontSize={14}>
                  {t(`navLinks.${option.text}`)}
                </StyledNavLink>
              </Link>
            ));
          }
          return null;
        })}
      </StyledNavLinksWrapper>
      <UserLoginButton menuOptions={authRequiredOptions} onLinksClick={onLinksClick} />
      <StyledCartButton onClick={onCartClick} disabled={disabledCart}>
        <StyledBadge badgeContent={cartLength} $isDisabled={disabledCart}>
          <SvgIcon component={CartIcon} inheritViewBox />
        </StyledBadge>
      </StyledCartButton>
    </StyledRightWrapper>
  );
};

export default NavLinks;
