import { SupportedIcons } from '@/constants/icons/supportedIcons';
import theme from '@/theme/theme';
import { IHeaderMenuOption } from '@/types/company';
import { ExpandLess, ExpandMore, PersonOutlined } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, SvgIcon, Typography, styled } from '@mui/material';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useUserState } from '@/hooks/contexts/useUserState';

const StyledButton = styled(Button)`
  width: max-content;
`;

const StyledLoggedButton = styled(StyledButton)`
  color: ${theme.palette.customText.primary};

  &:hover {
    background-color: ${theme.palette.customColors.lightGray};
  }
`;

const StyledMenu = styled(Menu)``;

const StyledSubWrapper = styled(Box)`
  padding: 8px;
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  gap: 8px;
  align-items: center;

  h4 {
    color: ${theme.palette.customText.secondary};
  }

  svg {
    color: ${theme.palette.customText.secondary};
  }

  &:hover {
    h4 {
      color: ${theme.palette.customText.primary};
    }

    svg {
      color: ${theme.palette.customText.primary};
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledLogout = styled(MenuItem)`
  display: flex;
  gap: 8px;
  align-items: center;

  h4 {
    color: ${theme.palette.error.main};
  }
  svg {
    color: ${theme.palette.error.main};
  }
`;

type Props = {
  onLinksClick?: () => void;
  menuOptions?: IHeaderMenuOption[];
};

const LoggedButton = ({ onLinksClick, menuOptions }: Props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { userData } = useUserState();

  // delete this when connect api
  const memoizedData = useMemo(() => {
    const personalData = userData?.data.find(item => item.id === 'personalData');
    const firstNameData = personalData?.data.find(item => item.id === 'firstName');
    const lastNameData = personalData?.data.find(item => item.id === 'lastName');
    const firstName = firstNameData?.value as string | undefined;
    const lastName = lastNameData?.value as string | undefined;
    const displayName = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName || '';

    return {
      displayName,
    };
  }, [userData]);
  //

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <StyledLoggedButton
        variant='text'
        startIcon={<PersonOutlined />}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={handleClick}>
        {memoizedData.displayName}
      </StyledLoggedButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <StyledSubWrapper>
          {menuOptions?.map(item => (
            <StyledMenuItem onClick={handleClose} key={item.text}>
              <StyledLink href={onLinksClick ? '#' : item.path}>
                <SvgIcon component={SupportedIcons[item.icon]} />
                <Typography variant='h4' fontWeight={600}>
                  {t(`navLinks.${item.text}`)}
                </Typography>
              </StyledLink>
            </StyledMenuItem>
          ))}
          <StyledLogout>
            <SvgIcon component={SupportedIcons.LOG_OUT} />
            <Typography variant='h4' fontWeight={600}>
              {t('logOut')}
            </Typography>
          </StyledLogout>
        </StyledSubWrapper>
      </StyledMenu>
    </div>
  );
};

export default LoggedButton;
