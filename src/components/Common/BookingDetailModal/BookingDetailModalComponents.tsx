import { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import DetailHeader from '@/components/Sections/Common/DetailHeader';
import FooterDrawer from '@/components/Common/FooterDrawer';
import theme from '@/theme/theme';
import { format } from 'date-fns';
import { IBooking } from '@/types/dockQueue';

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
  const { t } = useTranslation('common');
  return <StyledDetailHeader onClickBack={handleOnClose} title={t('bookingDetail')} />;
};
const StyledContainer = styled(Grid)`
  padding: 10px;
  > div {
    margin: 5px;
  }
  .read-more {
    padding: 0;
    margin-left: 5px;
  }
`;
type IBodyProps = {
  onAssignToMe: () => void;
  booking?: IBooking;
};
export const Body = ({ onAssignToMe, booking }: IBodyProps) => {
  const { t } = useTranslation(['actions', 'common']);
  const [showMore, setShowMore] = useState(false);
  const FORMAT = 'MM/dd, h:mm a';
  if (!booking) return null;
  return (
    <StyledContainer container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant='body1'>
            <b>{booking?.customerName}</b> {booking.bookingId}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button style={{ width: '100%' }} onClick={onAssignToMe} variant='outlined'>
          {t('actions:assignToMe')}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>{t('common:itemName')}</Typography>
        <Typography variant='body2'>{booking.item.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>{t('common:accessories')}</Typography>
        {booking.accessories.map(accessory => (
          <Typography variant='body2' key={accessory.id}>
            {accessory.title} x{accessory.quantity}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>{t('common:customerNote')}</Typography>
        {showMore ? (
          <Typography variant='body2'>
            {`${booking.customerNote} `}
            <Button className='read-more' onClick={() => setShowMore(false)}>
              {t('actions:readLess')}
            </Button>
          </Typography>
        ) : (
          <Typography variant='body2'>
            {`${booking.customerNote.slice(0, 150)}... `}
            <Button className='read-more' onClick={() => setShowMore(true)}>
              {t('actions:readMore')}
            </Button>
          </Typography>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='body1'>{t('common:launchedAt')}</Typography>
          <Typography variant='body2'>{format(new Date(booking.launch), FORMAT)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>{t('common:return')}</Typography>
          <Typography variant='body2'>{format(new Date(booking.return), FORMAT)}</Typography>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

type IFooterProps = {
  onReturn: () => void;
  onAddCharges: () => void;
  onQueue: () => void;
};
const ButtonWrapper = styled(Grid)`
  padding: 0 10px;
  button {
    width: 100%;
  }
`;
export const Footer = ({ onReturn, onAddCharges, onQueue }: IFooterProps) => {
  const { t } = useTranslation(['actions']);
  return (
    <FooterDrawer>
      <Grid container>
        <ButtonWrapper item xs={4}>
          <Button onClick={onAddCharges} variant='outlined'>
            {t('addCharges')}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper item xs={4}>
          <Button onClick={onReturn} variant='outlined'>
            {t('return')}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper item xs={4}>
          <Button onClick={onQueue} variant='outlined'>
            {t('queue')}
          </Button>
        </ButtonWrapper>
      </Grid>
    </FooterDrawer>
  );
};
