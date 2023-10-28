import { styled, Box, Divider, Collapse, List } from '@mui/material';
import theme from '@/theme';
import { transientOptions } from '@/utils/transientOptions';
import { ICustomerInfoInputs } from '@/mock/CUSTOMER_INFO_INPUTS';
import { FormProvider } from 'react-hook-form';
import { IFormGroup } from '@/validationSchemas/customerInformationSchema/customerInfoGroupSchema';
import { IArrayData } from '@/mock/USER_DATA';
import useAccordionForm from '@/hooks/useAccordionForm';
import Header from './Header';
import ReadOnlyComponent from './ReadOnlyComponent/ReadOnlyComponent';
import InputComponent from './InputComponent/InputComponent';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 1px solid ${theme.palette.customColors.gray};
  border-radius: 16px;
`;

const StyledAccordionDetails = styled(Box)`
  padding: 12px 16px 16px;
`;

const StyledFormContainer = styled(Box, transientOptions)<{ $hidde: boolean }>`
  --wrapper-gap: 12px;

  ${theme.breakpoints.up('lg')} {
    --wrapper-gap: 16px;
  }

  display: ${props => (props.$hidde ? 'none' : 'flex')};
  margin-top: 8px;
  gap: var(--wrapper-gap);
  flex-direction: column;

  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const StyledReadOnlyContainer = styled(List, transientOptions)<{ $hidde: boolean }>`
  display: ${props => (props.$hidde ? 'none' : 'flex')};
  flex-wrap: wrap;
  row-gap: 12px;

  & .MuiSvgIcon-root {
    color: ${theme.palette.customText.secondary};
  }
`;

const StyledDivider = styled(Divider, transientOptions)<{ $isOpenDropdown: boolean }>`
  width: ${props => (props.$isOpenDropdown ? '90%' : '0')};
  transition: all ease-out 0.2s;
`;

const StyledInputWrapper = styled(Box, transientOptions)<{ fullWidth: boolean }>`
  width: 100%;

  ${theme.breakpoints.up('md')} {
    max-width: ${props => (props.fullWidth ? '100%' : 'calc(50% - (var(--wrapper-gap) / 2))')};
  }
`;

type Props = {
  showInColumn?: boolean;
  showLabels?: boolean;
  showIcons?: boolean;
  title: string;
  inputsData: ICustomerInfoInputs[];
  parsedData: IFormGroup;
  mandatoriesIds: string[];
  name: string;
  groupId: string;
  setInvalidGroups: React.Dispatch<React.SetStateAction<boolean[]>>;
  groupIndex: number;
  isFirstInvalidGroup: boolean;
};

const Accordion = ({
  showInColumn = true,
  showLabels,
  showIcons,
  title,
  inputsData,
  parsedData,
  mandatoriesIds,
  name,
  groupId,
  setInvalidGroups,
  groupIndex,
  isFirstInvalidGroup,
}: Props) => {
  const { accordionForm, hasValues, hasErrors, isFormOpen, setIsFormOpen, accordionFormValues } = useAccordionForm({
    parsedData,
    mandatoriesIds,
    name,
    groupId,
    setInvalidGroups,
    groupIndex,
    isFirstInvalidGroup,
  });

  return (
    <FormProvider {...accordionForm}>
      <StyledWrapper component='article'>
        <Header title={title} handleShowForm={v => !hasErrors && setIsFormOpen(v)} isFormOpen={isFormOpen} />
        <StyledDivider $isOpenDropdown={hasValues || isFormOpen} />
        <Collapse unmountOnExit={false} in={hasValues || isFormOpen} timeout='auto' sx={{ width: '100%' }}>
          <StyledAccordionDetails>
            <StyledFormContainer $hidde={!isFormOpen}>
              {inputsData.map((inputData, index) => {
                return (
                  <StyledInputWrapper fullWidth={!!inputData.isFullWidth}>
                    <InputComponent
                      key={`inputData-${inputData.id}`}
                      type={inputData.type}
                      label={inputData.label}
                      name={`data.[${index}]`}
                      options={inputData.options}
                      minDate={inputData.minDate}
                      maxDate={inputData.maxDate}
                      isMandatory={inputData.isMandatory}
                    />
                  </StyledInputWrapper>
                );
              })}
            </StyledFormContainer>
            <StyledReadOnlyContainer $hidde={isFormOpen}>
              {accordionFormValues?.map(data => {
                if (!data.value || (Array.isArray(data.value) && data.value.length === 0)) return null;
                const value = data.value as string | number | boolean | IArrayData[];
                const inputData = inputsData.find(input => input.id === data.id);
                const icon = inputsData.find(input => input.id === data.id && input.icon)?.icon;

                return (
                  <ReadOnlyComponent
                    key={`readOnlyComponent-${data.id}`}
                    showInColumn={showInColumn}
                    label={showLabels ? inputData?.label ?? '<Unknown label>' : undefined}
                    icon={showIcons ? icon : undefined}
                    {...data}
                    value={value}
                  />
                );
              })}
            </StyledReadOnlyContainer>
          </StyledAccordionDetails>
        </Collapse>
      </StyledWrapper>
    </FormProvider>
  );
};

export default Accordion;
