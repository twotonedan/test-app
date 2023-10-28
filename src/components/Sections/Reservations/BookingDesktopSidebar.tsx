import { SupportedIcons } from '@/constants/icons/supportedIcons';
import useGetCompany from '@/hooks/api/useGetCompany';
import theme from '@/theme';
import { Box, List, ListItem, ListItemIcon, ListItemText, SvgIcon, styled } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import DummyDesktopHeader from '../Common/Header/DummyDesktopHeader';

const StyledWrapper = styled(Box)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
    width: 265px;
    height: 100vh;
    box-shadow: 0px 1px 4px 0px rgba(42, 51, 60, 0.16);
    position: fixed;
    top: 0;
    left: 0;
    overflow: auto;
  }
`;

const StyledList = styled(List)`
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledListItem = styled(ListItem)`
  padding: 16px 24px;

  &:hover {
    background-color: ${theme.palette.customButtons.secondary.backgroundHover};
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: ${theme.palette.customText.primary};
`;

const StyledItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: ${theme.palette.customText.primary};
  }
`;

const BookingDesktopSidebar = () => {
  const { data: companyData } = useGetCompany();
  const { t } = useTranslation();

  const sideBarMenuOptions = useMemo(() => {
    if (!companyData) return [];

    return companyData.header.menuOptions
      .filter(option => option.requiredAuth)
      .map(option => option.options)
      .flat();
  }, [companyData]);

  return (
    <StyledWrapper>
      <StyledList>
        <DummyDesktopHeader withShadow />
        {sideBarMenuOptions.map(option => (
          <StyledLink key={option.id} href={option.path}>
            <StyledListItem>
              <StyledListItemIcon>
                <SvgIcon component={SupportedIcons[option.icon]} />
              </StyledListItemIcon>
              <StyledItemText primary={t(`navLinks.${option.text}`)} />
            </StyledListItem>
          </StyledLink>
        ))}
      </StyledList>
    </StyledWrapper>
  );
};

export default BookingDesktopSidebar;
