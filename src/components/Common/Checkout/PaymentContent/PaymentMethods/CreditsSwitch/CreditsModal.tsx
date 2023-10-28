import useGetUserCredits from '@/hooks/api/useGetUserCredits';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Button, Modal, Typography, styled } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { ErrorOutlineOutlined } from '@mui/icons-material';
import useInputError from '@/hooks/useInputError';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useTranslation } from 'next-i18next';
import CustomAmountInput from './CustomAmountInput';

const StyledWrapper = styled(Box)`
  background: ${theme.palette.customColors.white};
  padding: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 16px;
  width: 321px;
`;

const StyledTitleWrapper = styled(Box)``;

const StyledAvailableCreditsWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const StyledLabel = styled(Typography)`
  color: ${theme.palette.customText.secondary};
`;

const StyledAmount = styled(Typography)`
  color: ${theme.palette.customText.secondary};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

const StyledButtonsWrapper = styled(Box)`
  display: flex;
  gap: 8px;
  width: 100%;
  margin-top: 32px;
`;

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

const StyledErrorWrapper = styled(Box)`
  display: flex;
  align-items: start;
  gap: 4px;
  margin-top: 32px;
`;

type Props = {
  className?: string;
  baseName: string;
};

const CreditsModal = NiceModal.create(({ className, baseName }: Props) => {
  const modal = useModal();
  const { t } = useTranslation();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const { creditsData, setCreditsData } = useCalculatePrice();
  const { data: availableCredits } = useGetUserCredits();
  const { currencyFormatter } = useCurrencyFormatter();
  const { setValue, setError } = useFormContext();
  const error = useInputError(baseName);
  const amount = useWatch({ name: baseName, defaultValue: creditsData });

  const handleConfirm = () => {
    if (error) return;
    setCreditsData(amount);
    handleOnClose();
  };

  const resetValue = () => {
    setError(baseName, { type: undefined, message: undefined });
    setValue(baseName, 0);
  };

  return (
    <Modal open={isOpen} onClose={handleOnClose} className={className}>
      <StyledWrapper>
        <StyledTitleWrapper>
          <Typography variant='h3' fontWeight={600}>
            {t('form.credits.useExistingCredits')}
          </Typography>
          <Typography lineHeight='22px'>{t('enterAmount')}:</Typography>
        </StyledTitleWrapper>

        <CustomAmountInput
          baseName={baseName}
          error={error}
          onIconClick={resetValue}
          onChange={value => {
            setValue(baseName, value);
          }}
        />

        <StyledAvailableCreditsWrapper>
          <StyledLabel variant='label' fontWeight={500}>
            {t('available')}:
          </StyledLabel>
          <StyledAmount>{availableCredits && currencyFormatter.format(availableCredits)}</StyledAmount>
        </StyledAvailableCreditsWrapper>
        {!!error && (
          <StyledErrorWrapper>
            <ErrorOutlineOutlined fontSize='small' sx={{ color: theme.palette.error.main }} />
            <Typography variant='h4'>{error}</Typography>
          </StyledErrorWrapper>
        )}
        <StyledButtonsWrapper>
          <StyledButton variant='outlined' onClick={handleOnClose}>
            {t('cancel')}
          </StyledButton>
          <StyledButton variant='contained' onClick={handleConfirm} disabled={!!error}>
            {t('form.credits.applyCredits')}
          </StyledButton>
        </StyledButtonsWrapper>
      </StyledWrapper>
    </Modal>
  );
});

export default CreditsModal;
