import theme from '@/theme';
import { Box, IconButton, Typography, styled } from '@mui/material';
import Switch from '@/components/Common/Switch';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { EditOutlined } from '@mui/icons-material';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { transientOptions } from '@/utils/transientOptions';
import { useTranslation } from 'next-i18next';
import { useEffect, useId, useMemo } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useGetUserCredits from '@/hooks/api/useGetUserCredits';
import creditsSchema, { ICreditsForm } from '@/validationSchemas/common/credits';

import CreditsModal from './CreditsModal';

const StyledWrapper = styled(Box)`
  border: 1px solid ${theme.palette.customColors.gray};
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  ${theme.breakpoints.up('md')} {
    max-width: 522px;
  }
`;

const StyledSwitch = styled(Switch)`
  .switch-label {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
  }
`;
const StyledAvailableCredits = styled(Typography, transientOptions)<{ $isChecked: boolean }>`
  color: ${props => (props.$isChecked ? theme.palette.customText.primary : theme.palette.customText.secondary)};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CreditsSwitch = () => {
  const baseName = 'creditsAmount';
  const disabled = false;
  const { t } = useTranslation();
  const { prices, creditsData, setCreditsData, useCredits, setUseCredits } = useCalculatePrice();
  const { currencyFormatter } = useCurrencyFormatter();
  const modalId = useId();
  const creditsAmountModal = `credits-amount-${modalId}`;
  const { data: availableCredits } = useGetUserCredits();

  const defaultCredits = useMemo(() => {
    if (availableCredits) {
      return availableCredits > prices.subTotal ? prices.subTotal : availableCredits;
    }
    return 0;
  }, [availableCredits, prices.subTotal]);

  const form = useForm<ICreditsForm>({
    resolver: yupResolver(creditsSchema(availableCredits ?? 0)),
    defaultValues: {
      [baseName]: creditsData,
    },
  });

  useEffect(() => {
    if (defaultCredits) {
      setCreditsData(defaultCredits);
      form.setValue(baseName, defaultCredits);
    }
  }, [defaultCredits, form, setCreditsData, useCredits]);

  const onSwitchChange = (isChecked: boolean) => {
    setUseCredits(isChecked);
  };

  if (!availableCredits) return null;
  return (
    <FormProvider {...form}>
      <StyledWrapper>
        <StyledSwitch
          name={baseName}
          disabled={disabled}
          onChange={onSwitchChange}
          checked={useCredits}
          label={t('form.credits.useCredits')}
          validateFields={baseName}
        />
        <StyledAvailableCredits variant='h4' fontWeight={600} $isChecked={useCredits}>
          {currencyFormatter.format(useCredits ? creditsData : availableCredits)}{' '}
          {useCredits ? (
            <IconButton
              onClick={() => {
                NiceModal.show(creditsAmountModal);
              }}>
              <EditOutlined fontSize='small' color='secondary' />
            </IconButton>
          ) : (
            <>{t('available').toLowerCase()}</>
          )}
        </StyledAvailableCredits>

        <CreditsModal id={creditsAmountModal} baseName={baseName} />
      </StyledWrapper>
    </FormProvider>
  );
};

export default CreditsSwitch;
