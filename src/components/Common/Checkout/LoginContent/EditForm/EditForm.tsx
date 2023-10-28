import { styled, Box, Button, Typography } from '@mui/material';
import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import { useSteps } from '@/hooks/contexts/useSteps';
import FooterDrawer from '@/components/Common/FooterDrawer/FooterDrawer';
import { ICustomerInfoInputsPayload } from '@/mock/CUSTOMER_INFO_INPUTS';
import { ErrorOutline } from '@mui/icons-material';
import { IFormGroup, IFormValues } from '@/validationSchemas/customerInformationSchema/customerInfoGroupSchema';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import customerInfoSchema from '@/validationSchemas/customerInformationSchema/customerInfoSchema';
import { useMemo, useState } from 'react';
import Accordion from './Accordion';
import LeftDesktopWrapper from '../../LeftDesktopWrapper';

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;

  ${theme.breakpoints.up('lg')} {
    padding: 0;
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const StyledButton = styled(Button)`
  width: inherit;
  ${theme.breakpoints.up('md')} {
    width: auto;
    margin-left: auto;
  }

  ${theme.breakpoints.up('lg')} {
    margin-left: unset;
    padding: 24px 67px;
    margin-right: 48px;
  }
`;

const StyledContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  margin-bottom: 16px;

  ${theme.breakpoints.up('lg')} {
    padding-bottom: 25px;
    overflow-y: scroll;
    max-height: calc(100vh - 390px);
    margin-top: 16px;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const StyledErrorMessage = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 4px;
  align-self: flex-start;
  margin-left: 8px;

  ${theme.breakpoints.up('lg')} {
    align-self: unset;
  }
`;

const StyledTypography = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const StyledFooter = styled(FooterDrawer)`
  ${theme.breakpoints.up('lg')} {
    box-shadow: none;
    padding: 24px 0;
  }
`;

const StyledLeftDesktopWrapper = styled(LeftDesktopWrapper)`
  margin-top: 21px;

  ${theme.breakpoints.up('lg')} {
    padding-right: 51px;
  }
`;

type Props = {
  inputsData: ICustomerInfoInputsPayload[] | undefined;
  parsedData: IFormGroup[];
  mandatoriesIds: string[];
};

const BASE_NAME = 'formInformation';

function EditForm({ inputsData, parsedData, mandatoriesIds }: Props) {
  const { t } = useTranslation('common');
  const { nextStep } = useSteps();
  const [invalidGrups, setInvalidGroups] = useState<boolean[]>([]);

  const firstInvalidGroupIdx = useMemo(() => invalidGrups.findIndex(invalid => invalid), [invalidGrups]);

  const handleGoToNextPage = () => nextStep();
  const form = useForm<IFormValues>({
    resolver: yupResolver(customerInfoSchema),
    defaultValues: {
      [BASE_NAME]: undefined,
    },
  });

  const isDisabled = useMemo(() => !form.formState.isValid, [form.formState.isValid]);

  return (
    <FormProvider {...form}>
      <StyledLeftDesktopWrapper>
        <StyledContainer>
          {inputsData?.map((data, i) => {
            const isFirstGroup = i === 0;
            const isInvalidGroup = i === firstInvalidGroupIdx;

            return (
              <Accordion
                name={`${BASE_NAME}.${i}`}
                groupIndex={i}
                mandatoriesIds={mandatoriesIds}
                parsedData={parsedData[i]}
                showInColumn={!isFirstGroup}
                showLabels={!isFirstGroup}
                showIcons={isFirstGroup}
                title={data.title}
                key={data.id}
                groupId={data.id}
                inputsData={data.data}
                setInvalidGroups={setInvalidGroups}
                isFirstInvalidGroup={isInvalidGroup}
              />
            );
          })}
        </StyledContainer>
      </StyledLeftDesktopWrapper>

      <StyledFooter>
        <StyledInnerWrapper>
          {isDisabled && (
            <StyledErrorMessage>
              <ErrorOutline fontSize='small' sx={{ color: theme.palette.error.main }} />
              <StyledTypography>{t('customerInformationForm.completeToProceed')}</StyledTypography>
            </StyledErrorMessage>
          )}
          <StyledButton onClick={handleGoToNextPage} variant='contained' disabled={isDisabled}>
            {t('next')}
          </StyledButton>
        </StyledInnerWrapper>
      </StyledFooter>
    </FormProvider>
  );
}

export default EditForm;
