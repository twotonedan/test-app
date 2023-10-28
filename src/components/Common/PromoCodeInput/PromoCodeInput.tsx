import promoFormSchema, { IPromoCodeForm } from '@/validationSchemas/checkoutPromoCodeSchema/checkoutPromoCodeSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowForward } from '@mui/icons-material';
import usePromoCode from '@/hooks/usePromoCode';
import { Button, InputAdornment, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import theme from '@/theme/theme';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import Input from '../Input/Input';
import SuccessfulOutput from './SuccessfulOutput';
import Loader from '../Loader/Loader';

const StyledInput = styled(Input)`
  & > .MuiInputBase-root {
    padding-right: 6px;
  }
`;

const StyledIconButton = styled(Button)`
  padding: 6px 12px;
  min-width: unset;
  width: 44px;
  height: 32px;

  & > .MuiSvgIcon-root {
    color: unset !important;
  }

  &.MuiButtonBase-root:disabled {
    background-color: ${theme.palette.action.disabledBackground};
    pointer-events: none;
    box-shadow: none;
  }
`;

type Props = {
  disabledCondition?: boolean;
};

const PromoCodeInput = ({ disabledCondition }: Props) => {
  const form = useForm<IPromoCodeForm>({ resolver: yupResolver(promoFormSchema) });
  const { t } = useTranslation('common');
  const { getPromoAmount, resetPromoCode, isLoading } = usePromoCode({
    form,
  });
  const discountIsDisabled = disabledCondition || !form.formState.isDirty || !form.formState.isValid || isLoading;
  const { promoCodeData } = useCalculatePrice();

  return (
    <FormProvider {...form}>
      {!promoCodeData ? (
        <StyledInput
          name='code'
          fullWidth
          label={t('promoCode')}
          validateFields={['code']}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <StyledIconButton onClick={getPromoAmount} variant='contained' disabled={discountIsDisabled}>
                  {isLoading ? <Loader size={18} /> : <ArrowForward />}
                </StyledIconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <SuccessfulOutput promoCodeData={promoCodeData} resetForm={resetPromoCode} />
      )}
    </FormProvider>
  );
};

export default PromoCodeInput;
