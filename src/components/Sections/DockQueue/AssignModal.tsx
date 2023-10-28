import { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { styled, Dialog, DialogContent, Button, Grid, Select, MenuItem, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { IUser } from '@/mock/USERS_LIST';

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    width: 343px;
    height: 311px;

    & .MuiDialogContent-root {
      flex: none;
      overflow: hidden;
      height: 100%;
    }
  }
`;
const StyledContainer = styled(Grid)`
  padding: 15px;
  > div {
    margin: 0 10px 15px;
    &:last-child {
      margin-top: 90px;
    }
  }
`;
const StyledItem = styled(Grid)`
  display: flex;
  justify-content: center;
`;
type Props = {
  initId: string;
  onAssign: (id: string) => void;
  users: IUser[];
};

const Assign = NiceModal.create(({ initId, onAssign, users }: Props) => {
  const [assigneeId, setAssigneeId] = useState(initId);
  const modal = useModal();
  const { t } = useTranslation(['common']);
  const { isOpen, handleOnClose } = useMuiDrawer(modal);

  return (
    <StyledDialog open={isOpen} onClose={handleOnClose}>
      <DialogContent>
        <StyledContainer container>
          <StyledItem item xs={12}>
            <Typography variant='h6'>{t('Assign')}</Typography>
          </StyledItem>
          <Grid item xs={12}>
            <Select
              label='Sort By'
              value={assigneeId || ''}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e): any => setAssigneeId(e.target.value)}
              fullWidth>
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <StyledItem container>
            <StyledItem item xs={6}>
              <Button variant='contained' onClick={handleOnClose}>
                {t('Close')}
              </Button>
            </StyledItem>
            <StyledItem item xs={6}>
              <Button variant='contained' onClick={() => onAssign(assigneeId)}>
                {t('Apply')}
              </Button>
            </StyledItem>
          </StyledItem>
        </StyledContainer>
      </DialogContent>
    </StyledDialog>
  );
});

export default Assign;
