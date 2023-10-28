import Dropdown from '@/components/Common/Dropdown';
import Input from '@/components/Common/Input';
import OptionsSelector from '@/components/Common/OptionsSelector';
import SingleCheck from '@/components/Common/SingleCheck';
import TimePicker from '@/components/Common/TimePicker';
import CustomStaticDatePicker from '@/components/Sections/Common/CustomStaticDatePicker/CustomStaticDatePicker';
import { InputType } from '@/types/enums';
import { useMemo } from 'react';

type Props = {
  name: string;
  type: InputType;
  label: string;
  options?: { label: string; value: string | number }[];
  minDate?: Date;
  maxDate?: Date;
  isMandatory: boolean;
};

const InputComponent = ({ type, name, label, options, minDate, maxDate, isMandatory }: Props) => {
  const baseName = `${name}.value`;
  const inputComponents = useMemo(() => {
    return {
      [InputType.STRING]: (
        <Input name={baseName} label={label} fullWidth isRequired={isMandatory} validateFields={name} />
      ),
      [InputType.NUMBER]: (
        <Input name={baseName} fullWidth label={label} type='number' isRequired={isMandatory} validateFields={name} />
      ),
      [InputType.PHONE]: (
        <Input name={baseName} fullWidth label={label} type='tel' isRequired={isMandatory} validateFields={name} />
      ),
      [InputType.DATE]: (
        <CustomStaticDatePicker
          name={`${baseName}`}
          disableFuture
          label={label}
          minDate={minDate}
          maxDate={maxDate}
          isRequired={isMandatory}
        />
      ),
      [InputType.EMAIL]: (
        <Input name={baseName} fullWidth label={label} type='email' isRequired={isMandatory} validateFields={name} />
      ),
      [InputType.SELECT]: options && (
        <Dropdown
          label={label}
          labelId={baseName}
          name={baseName}
          options={options}
          isRequired={isMandatory}
          fullWidth
        />
      ),
      [InputType.RADIO]: options && (
        <OptionsSelector
          title={label}
          name={baseName}
          options={options}
          isRequired={isMandatory}
          validateFields={name}
        />
      ),
      [InputType.CHECKBOX]: options && (
        <OptionsSelector
          allowMultipleSelection
          title={label}
          name={baseName}
          options={options}
          isRequired={isMandatory}
          validateFields={name}
        />
      ),
      [InputType.SINGLECHECK]: <SingleCheck label={label} baseName={baseName} isRequired={isMandatory} />,
      [InputType.TIME]: <TimePicker name={baseName} label={label} isRequired={isMandatory} />,
    };
  }, [label, baseName, options, minDate, maxDate, isMandatory, name]);

  return inputComponents[type] || null;
};

export default InputComponent;
