import theme from '@/theme/theme';
import { Box, List, RadioGroup, Typography, styled } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import useInputError from '@/hooks/useInputError';
import handleInputRef from '@/utils/handleInputRef';
import RadioButton from '../RadioButton/RadioButton';
import MultipleSelector from './MultipleSelector';
import InputHelper from '../InputHelper';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  color: ${theme.palette.customText.secondary};
  text-transform: uppercase;
`;

const StyledList = styled(List)`
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

type Props = {
  title: string;
  options: { label: string; value: string | number }[];
  name: string;
  allowMultipleSelection?: boolean;
  isRequired?: boolean;
  validateFields?: string | string[];
};

const OptionsSelector = ({
  title,
  name,
  options,
  allowMultipleSelection,
  isRequired = false,
  validateFields,
}: Props) => {
  const { control, trigger } = useFormContext();
  const error = useInputError(name);

  const handleTrigger = () => validateFields && trigger(validateFields);

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledTitle variant='subtitle1'>{title}</StyledTitle>
      </StyledHeader>
      <StyledList>
        {allowMultipleSelection ? (
          <MultipleSelector name={name} options={options} control={control} handleTrigger={handleTrigger} />
        ) : (
          <Controller
            defaultValue={null}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onChange={e => {
                  field.onChange(e);
                  handleTrigger();
                }}
                ref={_ref => handleInputRef(_ref as HTMLElement, field)}>
                {options.map(option => (
                  <RadioButton key={`radio-${option.value}`} label={option.label} value={option.value} size='small' />
                ))}
              </RadioGroup>
            )}
            name={name}
            control={control}
          />
        )}
      </StyledList>
      <InputHelper error={error} isRequired={isRequired} addMargin />
    </StyledWrapper>
  );
};

export default OptionsSelector;
