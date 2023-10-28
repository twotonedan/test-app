import theme from '@/theme';
import { CloseRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  DrawerProps,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  SvgIcon,
  Typography,
} from '@mui/material';
import { transientOptions } from '@/utils/transientOptions';
import { Fragment, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useGetCompany from '@/hooks/api/useGetCompany';
import { SupportedIcons } from '@/constants/icons/supportedIcons';
import { useTranslation } from 'next-i18next';
import { useUserState } from '@/hooks/contexts/useUserState';

const StyledContainer = styled(Box)`
  ${theme.mixins.layout};
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // svh unit is not supported in firefox yet
  @-moz-document url-prefix() {
    height: 100vh;
  }
`;

const StyledTopWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: sticky;
  top: 0;
  padding-top: 20px;
  padding-bottom: 10px;
  background-color: white;
  z-index: 1;
`;

const StyledItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: ${theme.palette.customText.primary};
  }
`;

const StyledList = styled(List)`
  max-height: unset !important;
`;

const StyledListItem = styled(ListItem, transientOptions)<{ $isFirstSection: boolean }>`
  padding: 5px 8px;

  :first-of-type {
    margin-top: ${props => (props.$isFirstSection ? 14 : 24)}px;
  }
  margin-bottom: 12px;
`;

const StyledNav = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: ${theme.palette.customText.primary};
`;

const StyledLogoWrapper = styled(Image)`
  object-fit: contain;
  object-position: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledLogout = styled(ListItem)`
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;

  h4 {
    color: ${theme.palette.error.main};
  }
  svg {
    color: ${theme.palette.error.main};
  }
`;

const StyledSignIn = styled(Typography)`
  cursor: pointer;
  margin-top: 32px;
  margin-bottom: 32px;
  color: ${theme.palette.primary.main};
`;

type Props = { handleClose: () => void } & DrawerProps;

const MobileMenu = ({ handleClose }: Props) => {
  const { data: companyData } = useGetCompany();
  const { t } = useTranslation();
  const { isLoggedIn } = useUserState();

  const sectionsToRender = useMemo(() => {
    return companyData?.header.menuOptions.filter(section => isLoggedIn || !section.requiredAuth);
  }, [companyData, isLoggedIn]);
  return (
    <StyledContainer component='aside'>
      <StyledTopWrapper>
        <StyledHeader component='header'>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', left: 0 }}>
            <CloseRounded color='primary' />
          </IconButton>
          {companyData && <StyledLogoWrapper src={companyData.logo} alt='logo' width={141} height={40} />}
        </StyledHeader>
        <StyledNav component='nav'>
          {sectionsToRender?.map((section, sectionIndex) => {
            const $isFirstSection = sectionIndex === 0;
            return (
              <Fragment key={section.id}>
                <StyledList>
                  {section.options.map(option => {
                    return (
                      <StyledLink key={option.id} href={option.path}>
                        <StyledListItem $isFirstSection={$isFirstSection}>
                          <StyledListItemIcon>
                            <SvgIcon component={SupportedIcons[option.icon]} />
                          </StyledListItemIcon>
                          <StyledItemText primary={t(`navLinks.${option.text}`)} />
                        </StyledListItem>
                      </StyledLink>
                    );
                  })}
                </StyledList>
                <Divider />
              </Fragment>
            );
          })}
        </StyledNav>
      </StyledTopWrapper>

      {isLoggedIn ? (
        <StyledLogout>
          <SvgIcon component={SupportedIcons.LOG_OUT} />
          <Typography variant='h4' fontWeight={600}>
            {t('logOut')}
          </Typography>
        </StyledLogout>
      ) : (
        <StyledSignIn variant='h4' fontWeight={600}>
          {t('signIn')}
        </StyledSignIn>
      )}
    </StyledContainer>
  );
};

export default MobileMenu;
