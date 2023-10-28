import theme from '@/theme/theme';
import { ListItem, styled } from '@mui/material';
import { Control, FieldValues, useController, useFieldArray } from 'react-hook-form';
import Checkbox from '@/components/Common/Checkbox';
import handleInputRef from '@/utils/handleInputRef';

type Props = {
  name: string;
  options: { label: string; value: string | number }[];
  control: Control<FieldValues, unknown>;
  handleTrigger: () => void;
};

const StyledListItem = styled(ListItem)`
  display: flex;
  padding: 4px 0;
  grid-gap: 8px;
  border-radius: 4px;

  :hover {
    background-color: ${theme.palette.customColors.barelyBlue};
  }
`;

const StyledCheckbox = styled(Checkbox)`
  width: 100%;
`;

const MultipleSelector = ({ name, options, control, handleTrigger }: Props) => {
  const { fields, append, remove } = useFieldArray({ name, control });
  const { field } = useController({ name, control });
  const handleChange = (checked: boolean, value: string | number, checkedIndex: number) => {
    if (!checked) append({ value });
    else remove(checkedIndex);
    handleTrigger();
  };

  return (
    <>
      {options.map(option => {
        const typedFields = fields as unknown as { value: number | string }[];
        const checkedIndex = typedFields.findIndex(_field => _field.value === option.value);
        const checked = checkedIndex !== -1;

        return (
          <StyledListItem key={`checkbox-${option.value}`} ref={_ref => handleInputRef(_ref as HTMLElement, field)}>
            <StyledCheckbox
              label={option.label}
              size='small'
              name={name}
              onChange={() => handleChange(checked, option.value, checkedIndex)}
              checked={checked}
            />
          </StyledListItem>
        );
      })}
    </>
  );
};

export default MultipleSelector;
