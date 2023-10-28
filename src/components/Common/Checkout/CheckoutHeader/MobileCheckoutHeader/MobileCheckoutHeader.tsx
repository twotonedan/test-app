import { ArrowBackIcon } from '@/assets';
import ConfirmModal from '@/components/Common/ConfirmModal/ConfirmModal';
import StickyHeader from '@/components/Common/StickyHeader/StickyHeader';
import { useSteps } from '@/hooks/contexts/useSteps';
import theme from '@/theme/theme';
import { CheckoutStepsEnum } from '@/types/enums';
import NiceModal from '@ebay/nice-modal-react';
import { IconButton, SvgIcon, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useId } from 'react';

const StyledStickyHeader = styled(StickyHeader)`
  ${theme.mixins.layout};

  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const MobileCheckoutHeader = () => {
  const id = useId();
  const exitModalId = `exit-checkout-modal-${id}`;
  const { t } = useTranslation('common');
  const router = useRouter();
  const { currentStep, prevStep } = useSteps();

  const handleConfirmRemoveChanges = () => {
    router.back();
  };

  const handleGoBack = () => {
    if (currentStep === CheckoutStepsEnum.REGISTER) {
      NiceModal.show(exitModalId);
    } else {
      prevStep();
    }
  };

  return (
    <>
      <StyledStickyHeader
        leftComponent={
          <IconButton onClick={handleGoBack}>
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </IconButton>
        }
        middleComponent={<Typography variant='h1'>{t('checkOut.title')}</Typography>}
        rightComponent={null}
      />

      <ConfirmModal
        id={exitModalId}
        confirmChangesTitle={t('checkOut.confirmChangesTitle')}
        confirmChangesDescription={t('checkOut.confirmChangesDescription')}
        onConfirmChanges={handleConfirmRemoveChanges}
      />
    </>
  );
};

export default MobileCheckoutHeader;
