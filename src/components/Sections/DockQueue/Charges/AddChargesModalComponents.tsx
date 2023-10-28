import { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { styled, Dialog, DialogContent, Button, Grid, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ICharge } from '@/types/dockQueue';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '@/components/Common/Input/Input';
import InputAdornment from '@mui/material/InputAdornment';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import theme from '@/theme/theme';
import DetailHeader from '@/components/Sections/Common/DetailHeader';
import FooterDrawer from '@/components/Common/FooterDrawer';

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
const ModalContainer = styled(Grid)`
  padding: 15px;
  > div {
    margin: 0 10px 15px;
    &:last-child {
      margin-top: 40px;
    }
  }
`;
const StyledItem = styled(Grid)`
  display: flex;
  justify-content: center;
`;
const StyledInput = styled(Input)`
  width: min-content;
  input {
    font-size: 24px;
    width: 120px;
    text-align: center;
  }
  p {
    font-size: 24px;
  }
  fieldset {
    border: none;
  }
`;

type ModalProps = {
  applyCharge: (id: string, value: number) => void;
  charge: ICharge;
};
export const ChargeModal = NiceModal.create(({ applyCharge, charge }: ModalProps) => {
  const modal = useModal();
  const { t } = useTranslation(['actions']);
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const form = useForm({ defaultValues: { amount: charge.value || 0 } });
  const amount = form.getValues('amount');
  const total = charge.rate && Number(amount * charge.rate).toFixed(2);
  return (
    <FormProvider {...form}>
      <StyledDialog open={isOpen} onClose={handleOnClose}>
        <DialogContent>
          <ModalContainer container>
            <StyledItem item xs={12}>
              <Typography variant='h6'>
                {t('enter')} {charge.units}
              </Typography>
            </StyledItem>
            <Grid container justifyContent='center'>
              <StyledInput name='amount' fullWidth label='' type='number' />
            </Grid>
            {charge?.rate && (
              <Grid container justifyContent='space-around'>
                <Grid item xs={6}>
                  <Typography variant='body2'>
                    1 {charge.units} = ${charge.rate?.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2'>
                    {t('total')} ${total}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <StyledItem container>
              <StyledItem item xs={6}>
                <Button variant='outlined' onClick={handleOnClose}>
                  {t('cancel')}
                </Button>
              </StyledItem>
              <StyledItem item xs={6}>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleOnClose();
                    applyCharge(charge.id, Number(form.getValues('amount')));
                  }}>
                  {t('save')}
                </Button>
              </StyledItem>
            </StyledItem>
          </ModalContainer>
        </DialogContent>
      </StyledDialog>
    </FormProvider>
  );
});
export const CurrencyChargeModal = NiceModal.create(({ applyCharge, charge }: ModalProps) => {
  const modal = useModal();
  const { t } = useTranslation(['actions']);
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const form = useForm({ defaultValues: { amount: charge.value.toFixed(2) || '0.00' } });
  const formatOnBlur = () => {
    form.setValue('amount', Number(form.getValues('amount')).toFixed(2));
  };
  return (
    <FormProvider {...form}>
      <StyledDialog open={isOpen} onClose={handleOnClose}>
        <DialogContent>
          <ModalContainer container>
            <StyledItem item xs={12}>
              <Typography variant='h6'>{t('enterChargeAmount')}</Typography>
            </StyledItem>
            <Grid container justifyContent='center'>
              <StyledInput
                InputProps={{
                  startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => form.setValue('amount', '0.00')} edge='end'>
                        <ClearOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onBlur={formatOnBlur}
                name='amount'
                fullWidth
                label=''
                type='number'
              />
            </Grid>
            <StyledItem container>
              <StyledItem item xs={6}>
                <Button variant='outlined' onClick={handleOnClose}>
                  {t('cancel')}
                </Button>
              </StyledItem>
              <StyledItem item xs={6}>
                <Button
                  variant='contained'
                  onClick={() => {
                    handleOnClose();
                    applyCharge(charge.id, Number(form.getValues('amount')));
                  }}>
                  {t('save')}
                </Button>
              </StyledItem>
            </StyledItem>
          </ModalContainer>
        </DialogContent>
      </StyledDialog>
    </FormProvider>
  );
});

const StyledDetailHeader = styled(DetailHeader)`
  display: block;
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;
type IHeaderProps = {
  handleOnClose: () => void;
};
export const Header = ({ handleOnClose }: IHeaderProps) => {
  const { t } = useTranslation('actions');
  return <StyledDetailHeader onClickBack={handleOnClose} title={t('addCharges')} />;
};
const StyledContainer = styled(Grid)`
  padding: 10px;
  > div {
    margin: 5px;
  }
`;
const ChargesWrapper = styled(Grid)`
  > div {
    margin: 20px 0;
    svg {
      margin-left: 5px;
    }
    [data-testid='AddOutlinedIcon'] {
      margin-left: 60px;
    }
  }
`;
type Props = {
  charges: ICharge[];
  applyCharge: (id: string, value: number) => void;
  itemName: string;
  bookingId: string;
  customerName: string;
};
export const Body = ({ charges, applyCharge, itemName, bookingId, customerName }: Props) => {
  const { t } = useTranslation('actions');
  const [selectedCharge, setSelectedCharge] = useState<ICharge | undefined>();
  let numberOfCharges = 0;
  const chargesTotal = charges.reduce((acc: number, charge: ICharge) => {
    if (charge.value) numberOfCharges += 1;
    return acc + charge.value;
  }, 0);
  return (
    <StyledContainer container>
      <Grid item xs={12} style={{ marginBottom: 0 }}>
        <b>
          {t('addingChargesTo')} {itemName}
        </b>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 0 }}>
        {t('bookingIdNumber')}
        {bookingId}, {customerName}
      </Grid>
      <ChargesWrapper item xs={12}>
        {charges?.map((charge: ICharge) => (
          <Grid container key={charge.id}>
            <Grid item xs={8}>
              {charge.name}
            </Grid>
            <Grid item xs={4}>
              {charge.value ? (
                <Button
                  variant='outlined'
                  onClick={() => {
                    setSelectedCharge(charge);
                    NiceModal.show('charge-modal');
                  }}>
                  <Typography variant='body1'>
                    {charge.isCurrency ? `$${charge.value.toFixed(2)}` : charge.value}
                  </Typography>
                  <EditOutlinedIcon />
                </Button>
              ) : (
                <Button
                  variant='text'
                  onClick={() => {
                    setSelectedCharge(charge);
                    NiceModal.show('charge-modal');
                  }}>
                  <AddOutlinedIcon />
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
      </ChargesWrapper>
      <Grid container>
        <Grid item xs={9}>
          <b>
            {numberOfCharges} {t('chargesAdded')}
          </b>
        </Grid>
        <Grid item xs={3}>
          <b>{`$${chargesTotal.toFixed(2)}`}</b>
        </Grid>
      </Grid>
      {selectedCharge &&
        (selectedCharge.isCurrency ? (
          <CurrencyChargeModal id='charge-modal' applyCharge={applyCharge} charge={selectedCharge} />
        ) : (
          <ChargeModal id='charge-modal' applyCharge={applyCharge} charge={selectedCharge} />
        ))}
    </StyledContainer>
  );
};

const ButtonWrapper = styled(Grid)`
  padding: 0 10px;
  button {
    width: 100%;
  }
`;
type FooterProps = {
  cancel: () => void;
  saveAddedCharges: () => void;
};
export const Footer = ({ saveAddedCharges, cancel }: FooterProps) => {
  const { t } = useTranslation(['actions']);
  return (
    <FooterDrawer>
      <Grid container>
        <ButtonWrapper item xs={6}>
          <Button onClick={cancel} variant='outlined'>
            {t('cancel')}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper item xs={6}>
          <Button onClick={saveAddedCharges} variant='contained'>
            {t('save')}
          </Button>
        </ButtonWrapper>
      </Grid>
    </FooterDrawer>
  );
};
