import { memo, useId, useEffect } from 'react';
import NiceModal, { NiceModalHocProps, useModal } from '@ebay/nice-modal-react';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { yupResolver } from '@hookform/resolvers/yup';
import DetailHeader from '@/components/Sections/Common/DetailHeader/DetailHeader';
import joinWaitlistFormSchema, {
  IJoinWaitlistForm,
} from '@/validationSchemas/joinWaitlistFormSchema/joinWaitlistFormSchema';
import theme from '@/theme/theme';
import useSendData, { IDataPayload } from '@/hooks/api/useSendWaitlistData';
import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import { ICardPayload } from '@/types/cards';
import FooterDrawer from '@/components/Common/FooterDrawer';
import { CloseRounded } from '@mui/icons-material';
import { BookingInformationType } from '@/types/enums';

import { JoinWaitlistForm } from './JoinWaitlistForm';
import JoinWaitlistSuccessModal from './JoinWaitlistSuccess';
import CardDetail from './CardDetail';
import DrawerOrModal from '../DrawerOrModal/DrawerOrModal';

const StyledInnerDrawer = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
`;

const StyledHeader = styled(Box)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    justify-content: space-between;
  }
`;

const StyledMobileHeader = styled(DetailHeader)`
  ${theme.breakpoints.up('md')} {
    display: none;
    border-radius: 16px;
  }
`;

const StyledButtonContainer = styled(Box)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    justify-content: flex-end;

    button {
      width: 180px;
    }
  }
`;

const StyledMobileFooterDrawer = styled(FooterDrawer)`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledWrapper = styled(Box)`
  background: ${theme.palette.customColors.white};

  ${theme.breakpoints.up('md')} {
    width: 605px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    padding: 24px 24px 32px 24px;
  }
`;

interface ModalProps extends NiceModalHocProps {
  cardData: ICardPayload;
  isSingleDate: boolean;
  bookingInformation: Partial<IBookingInformation>;
  bookingInformationFormat: BookingInformationType;
}

const JoinWaitlistModal = NiceModal.create(
  ({ cardData, isSingleDate, bookingInformation, bookingInformationFormat }: ModalProps) => {
    const sendDataMutation = useSendData();
    const modal = useModal();
    const { isOpen } = useMuiDrawer(modal);
    const { t } = useTranslation(['waitlist', 'common']);
    const successId = useId();
    const successModalId = `waitlist-success-modal-${successId}`;

    const form = useForm<IJoinWaitlistForm>({
      resolver: yupResolver(joinWaitlistFormSchema),
      defaultValues: {
        bookingInformation,
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      },
    });
    const { handleSubmit } = form;

    const isSubmitDisabled = !form.formState.isDirty || !form.formState.isValid;

    const onSubmit = handleSubmit(data => {
      sendDataMutation.mutate(data as IDataPayload);
    });
    useEffect(() => {
      if (sendDataMutation.data === 'success') NiceModal.show(successModalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendDataMutation.data]);
    const onClose = () => modal.hide();

    if (cardData) {
      return (
        <DrawerOrModal isOpen={isOpen} onClose={onClose} anchor='right'>
          <>
            <FormProvider {...form}>
              <StyledWrapper>
                <StyledMobileHeader title={t('common:joinWaitlist')} onClickBack={onClose} rightComponent={<div />} />
                <StyledHeader>
                  <Typography variant='h2'>{t('common:joinWaitlist')}</Typography>
                  <IconButton onClick={onClose}>
                    <CloseRounded color='primary' />
                  </IconButton>
                </StyledHeader>

                <CardDetail cardData={cardData} />
                <JoinWaitlistForm isSingleDate={isSingleDate} bookingInformationFormat={bookingInformationFormat} />

                <StyledButtonContainer>
                  <Button variant='contained' disabled={isSubmitDisabled} onClick={onSubmit}>
                    {t('common:submit')}
                  </Button>
                </StyledButtonContainer>
                <StyledMobileFooterDrawer>
                  <StyledInnerDrawer>
                    <StyledButton variant='contained' disabled={isSubmitDisabled} fullWidth onClick={onSubmit}>
                      {t('common:submit')}
                    </StyledButton>
                  </StyledInnerDrawer>
                </StyledMobileFooterDrawer>
              </StyledWrapper>
            </FormProvider>
            <JoinWaitlistSuccessModal id={successModalId} />
          </>
        </DrawerOrModal>
      );
    }
    return null;
  }
);

export default memo(JoinWaitlistModal);
