import { styled, Typography, Button } from '@mui/material';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import createAccountFormSchema, {
  ICreateAccountFormSchema,
} from '@/validationSchemas/checkoutCreateAccountFormSchema/checkoutCreateAccountFormSchema';
import InputPassword from '@/components/Common/InputPassword/InputPassword';

const StyledInputsContainer = styled('div')`
  margin-bottom: 12px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 12px;
`;

const StyledContainer = styled('section')`
  margin-top: 12px;
  ${theme.breakpoints.up('lg')} {
    margin-top: 0;
  }
`;

const StyledTestsLabel = styled('span')`
  display: flex;
  gap: 4px;
`;

const StyledInfoOutlinedIcon = styled(InfoOutlinedIcon)`
  color: ${theme.palette.error.main};
`;

const StyledCheckOutlinedIcon = styled(CheckOutlinedIcon)`
  color: ${theme.palette.customColors.lightGreen};
  margin-left: 8px;
`;

type CreateAccountProps = {
  password: string;
};

type Props = {
  accountCreated: boolean;
  onCreateAccount?: (data: CreateAccountProps) => void;
};

function CreateAccountForm({ onCreateAccount, accountCreated }: Props) {
  const { t } = useTranslation(['common']);
  const form = useForm<ICreateAccountFormSchema>({ resolver: yupResolver(createAccountFormSchema) });

  const handleCreateAccount = () => {
    onCreateAccount?.(form.getValues());
  };

  const onSubmit = () => {};

  const isCreateAccountDisabled = !form.formState.isDirty || !form.formState.isValid;

  return (
    <StyledContainer>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StyledInputsContainer>
            <InputPassword
              name='password'
              validateFields={['password']}
              label={t('newPassword')}
              disabled={accountCreated}
            />
          </StyledInputsContainer>
          <StyledButton
            disabled={isCreateAccountDisabled || accountCreated}
            onClick={handleCreateAccount}
            variant='outlined'>
            {accountCreated ? (
              <>
                {t('postCheckout.accountCreated')} <StyledCheckOutlinedIcon fontSize='small' />
              </>
            ) : (
              <>{t('postCheckout.createAccount')}</>
            )}
          </StyledButton>
        </form>
      </FormProvider>
      {!accountCreated && (
        <StyledTestsLabel>
          <StyledInfoOutlinedIcon />
          <Typography variant='h4'>{t('postCheckout.accountRequired')}</Typography>
        </StyledTestsLabel>
      )}
    </StyledContainer>
  );
}

export default CreateAccountForm;
