import { WaitlistSuccessIcon } from '@/assets';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import useToPath from '@/hooks/useToPath';
import theme from '@/theme/theme';
import { PageType } from '@/types/enums';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { CloseRounded } from '@mui/icons-material';
import { Box, Button, IconButton, SvgIcon, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import DrawerOrModal from '../DrawerOrModal/DrawerOrModal';

const StyledWrapper = styled(Box)`
  background: ${theme.palette.customColors.white};
  width: 522px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  padding: 24px;
`;

const StyledHeader = styled(Box)`
  ${theme.mixins.layout}
  padding-top: 24px;
  display: flex;
  justify-content: flex-end;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledContent = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  gap: 24px;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledTextWrapper = styled(Box)`
  max-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${theme.breakpoints.up('md')} {
    max-width: 100%;
  }
`;

const StyledTitle = styled(Typography)``;
const StyledDescription = styled(Typography)``;

const StyledFooter = styled(Box)`
  ${theme.mixins.layout}
  margin-bottom: 24px;

  ${theme.breakpoints.up('md')} {
    padding: 0;
    margin-top: 72px;
    margin-bottom: 8px;
  }
`;

const JoinWaitlistSuccessModal = NiceModal.create(() => {
  const modal = useModal();
  const { isOpen } = useMuiDrawer(modal);
  const { t } = useTranslation(['common', 'waitlist']);

  const router = useRouter();
  const { toPath } = useToPath({ pageType: PageType.INDEX });

  const onClose = () => {
    router.push({ pathname: toPath() });
  };

  return (
    <DrawerOrModal isOpen={isOpen} onClose={onClose} anchor='right'>
      <StyledWrapper>
        <StyledHeader>
          <IconButton onClick={onClose}>
            <CloseRounded color='primary' />
          </IconButton>
        </StyledHeader>
        <StyledContent>
          <SvgIcon component={WaitlistSuccessIcon} inheritViewBox sx={{ width: '128px', height: '128px' }} />
          <StyledTextWrapper>
            <StyledTitle variant='h2' fontWeight={600}>
              {t('waitlist:success.title')}
            </StyledTitle>
            <StyledDescription fontSize={16} fontWeight={400} lineHeight='22px'>
              {t('waitlist:success.description')}
            </StyledDescription>
          </StyledTextWrapper>
        </StyledContent>
        <StyledFooter>
          <Button onClick={onClose} fullWidth variant='contained'>
            {t('done')}
          </Button>
        </StyledFooter>
      </StyledWrapper>
    </DrawerOrModal>
  );
});

export default JoinWaitlistSuccessModal;
