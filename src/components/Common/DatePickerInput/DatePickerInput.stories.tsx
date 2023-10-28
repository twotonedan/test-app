import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Meta, StoryFn } from '@storybook/react';
import { disableVariants } from '@/utils/disableVariants';
import DatePickerInput from './DatePickerInput';

export default {
  title: 'Components/DatePicker',
  component: DatePickerInput,
  argTypes: disableVariants(['name', 'controllerProps', 'renderInputProps']),
} as Meta<typeof DatePickerInput>;

const Template: StoryFn<typeof DatePickerInput> = ({ ...args }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePickerInput
        {...args}
        name='story-date-picker'
        //  @ts-ignore
        renderInputProps={{ error: args.error, helperText: args.helperText }}
      />
    </LocalizationProvider>
  );
};

export const DatePickerComponent = Template.bind({});
DatePickerComponent.storyName = 'Date Picker';
DatePickerComponent.args = {
  label: 'Start Date',
  // @ts-ignore
  helperText: '',
  disabled: false,
  error: false,
};
