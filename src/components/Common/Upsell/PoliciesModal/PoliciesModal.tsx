import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { styled, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'next-i18next';
import theme from '@/theme';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import StickyHeader from '@/components/Common/StickyHeader/StickyHeader';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import policiesSchema, { IPoliciesForm } from '@/validationSchemas/policiesSchema/policiesSchema';
import { useRef } from 'react';

import Policies from '../Policies/Policies';
import FooterDrawer from '../../FooterDrawer/FooterDrawer';
import DrawerOrModal from '../../DrawerOrModal/DrawerOrModal';

const StyledDrawerOrModal = styled(DrawerOrModal)``;

const StyledWrapper = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: ${theme.palette.customColors.white};

  ${theme.breakpoints.up('md')} {
    width: 522px;
    height: 540px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
  }
`;

const StyledMobileHeader = styled(StickyHeader)`
  .stickyHeader-innerWrapper {
    display: block;
    ${theme.mixins.layout}

    ${theme.breakpoints.up('md')} {
      display: none;
    }
  }
`;

const StyledStickyHeader = styled(StickyHeader)`
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;

  .stickyHeader-innerWrapper {
    display: none;

    ${theme.breakpoints.up('md')} {
      margin: auto 24px;
      display: block;
    }
  }
`;

const StyledContainer = styled(Box)`
  ${theme.mixins.layout}
  height: max-content;
  display: flex;
  padding-top: 24px;

  ${theme.breakpoints.up('md')} {
    padding-top: 0;
    padding: 0px 24px;
    overflow-y: auto;
  }
`;

const StyledFooterDrawer = styled(FooterDrawer)`
  ${theme.breakpoints.up('md')} {
    position: relative;
    background: ${theme.palette.customColors.white};
    border-radius: 16px;
    padding: 16px 0px 32px 0px;
  }
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;

  ${theme.breakpoints.up('md')} {
    padding: 0px 24px;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  width: inherit;

  ${theme.breakpoints.up('md')} {
    max-width: 125px;
  }
`;

const StyledMandatoryMessage = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 9px;
  width: inherit;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledInfoOutlinedIcon = styled(InfoOutlinedIcon)`
  color: ${theme.palette.error.main};
`;

const StyledRequired = styled(Typography)`
  color: ${theme.palette.error.main};
`;

const StyledRequiredMessageContainer = styled(Box)`
  display: flex;
  align-items: baseline;
`;

type Props = {
  policiesDescription: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const PoliciesModal = NiceModal.create(({ policiesDescription, onConfirm, onCancel }: Props) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const modal = useModal();
  const { t } = useTranslation('common');
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const form = useForm<IPoliciesForm>({
    resolver: yupResolver(policiesSchema),
  });

  const isSignDisabled = !form.formState.isDirty || !form.formState.isValid;

  return (
    <StyledDrawerOrModal ref={parentRef} isOpen={isOpen} onClose={onCancel || handleOnClose} anchor='right'>
      <StyledWrapper>
        <StyledMobileHeader
          leftComponent={<div />}
          middleComponent={<Typography variant='h1'>{t('policies.title')}</Typography>}
          rightComponent={
            <IconButton onClick={onCancel || handleOnClose}>
              <CloseIcon />
            </IconButton>
          }
          parentRef={parentRef}
        />
        <StyledStickyHeader
          disabledShadow
          leftComponent={<Typography variant='h2'>{t('policies.title')}</Typography>}
          middleComponent={<div />}
          rightComponent={
            <IconButton onClick={onCancel || handleOnClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <StyledContainer>
          <FormProvider {...form}>
            <Policies policiesDescription={policiesDescription} />
          </FormProvider>
        </StyledContainer>
        <StyledFooterDrawer elevation={0}>
          <StyledInnerWrapper>
            {isSignDisabled && (
              <StyledMandatoryMessage>
                <StyledInfoOutlinedIcon fontSize='small' />
                <StyledRequiredMessageContainer>
                  <StyledRequired variant='h4'>*</StyledRequired>
                  <Typography variant='h4'>{t('policies.completeMandatory')}</Typography>
                </StyledRequiredMessageContainer>
              </StyledMandatoryMessage>
            )}
            <StyledButton disabled={isSignDisabled} onClick={onConfirm} variant='contained'>
              {t('policies.sign')}
            </StyledButton>
          </StyledInnerWrapper>
        </StyledFooterDrawer>
      </StyledWrapper>
    </StyledDrawerOrModal>
  );
});

export default PoliciesModal;
