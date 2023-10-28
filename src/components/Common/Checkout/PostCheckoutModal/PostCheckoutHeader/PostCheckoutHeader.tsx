import { IconButton, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import useIsDesktop from '@/hooks/useIsDesktop';
import StickyHeader from '../../../StickyHeader/StickyHeader';
import { StripeError } from '../ErrorCheckout/ErrorCheckout';

type Props = {
  onClose?: () => void;
  isError?: boolean;
  stripeError?: StripeError;
};

const PostCheckoutHeader = ({ onClose, isError, stripeError }: Props) => {
  const { t } = useTranslation('common');
  const isDesktop = useIsDesktop();

  return (
    <StickyHeader
      leftComponent={
        !stripeError && isDesktop && <Typography variant='h1'>{!isError && t('payment.thankYou')}</Typography>
      }
      middleComponent={
        !stripeError && !isDesktop && <Typography variant='h1'>{!isError && t('payment.thankYou')}</Typography>
      }
      rightComponent={
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      }
    />
  );
};

export default PostCheckoutHeader;
