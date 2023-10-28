import * as React from 'react';
import theme from '@/theme/theme';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/system';
import { useTranslation } from 'next-i18next';
import { PageType } from '@/types/enums';
import useToPath from '@/hooks/useToPath';
import { useRouter } from 'next/router';
import useEditingCartItemLS from '@/hooks/localStorage/useEditingCartItemLS';
import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';

const StyledMenu = styled(Menu)`
  & .MuiPaper-root {
    width: 162px;
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.24);
    border-radius: 8px;
    padding: 4px 8px;

    & li {
      padding: 10px 8px;
      border-radius: 0;
    }
    & li:not(:last-child) {
      border-bottom: 1px solid ${theme.palette.customColors.gray};
    }
  }
`;

const StyledEditTitle = styled(Typography)`
  font-weight: 500;
`;

const StyledDeleteTitle = styled(Typography)`
  font-weight: 500;
  color: ${theme.palette.error.main};
`;

type Props = {
  $uniqueId: string;
  cardId: string;
  bookingInformation: IBookingInformation;
  onClose?: () => void;
  onShowConfirmModal: () => void;
};

const EditMenu = ({ $uniqueId, cardId, bookingInformation, onClose, onShowConfirmModal }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation('common');
  const router = useRouter();

  const { toPath } = useToPath({ pageType: PageType.ITEM_DETAIL });
  const { handleSetEditingCartItem } = useEditingCartItemLS();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleOpenItem = () => {
    handleClose();
    handleSetEditingCartItem($uniqueId, cardId, bookingInformation);
    router.push({ pathname: toPath({ id: cardId }) });
    onClose?.();
  };

  const handleClickDelete = async () => {
    handleClose();
    onShowConfirmModal();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon color='secondary' fontSize='small' />
      </IconButton>
      <StyledMenu
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleOpenItem}>
          <StyledEditTitle variant='label'>{t('editItem')}</StyledEditTitle>
        </MenuItem>
        <MenuItem onClick={handleClickDelete}>
          <StyledDeleteTitle variant='label'>{t('deleteItem.title')}</StyledDeleteTitle>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default EditMenu;
