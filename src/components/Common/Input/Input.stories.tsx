import { Close, Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { ComponentProps } from 'react';
import Input from './Input';

const startAdornment: ComponentProps<typeof Input>['InputProps'] = {
  startAdornment: () => (
    <InputAdornment position='start'>
      <Search />
    </InputAdornment>
  ),
};

const endAdornment: ComponentProps<typeof Input>['InputProps'] = {
  endAdornment: ({ field, setValue, handleCallbackFunc }) => (
    <InputAdornment position='end'>
      <Close
        className='close-button'
        onClick={() => {
          setValue(field.name, '');
          handleCallbackFunc();
        }}
      />
    </InputAdornment>
  ),
};

const bothAdornments = {
  ...startAdornment,
  ...endAdornment,
};

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    InputProps: {
      name: 'iconsPosition',
      options: ['startIcon', 'endIcon', 'both', 'none'],
      mapping: {
        startIcon: startAdornment,
        endIcon: endAdornment,
        both: bothAdornments,
        none: {},
      },
      control: {
        type: 'select',
        labels: {
          startIcon: 'Start Icon',
          endIcon: 'End Icon',
          both: 'Both',
          none: 'None',
        },
      },
    },
    margin: {
      table: {
        disable: true,
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
    controllerProps: {
      table: {
        disable: true,
      },
    },
    focused: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = ({ ...args }) => {
  return <Input {...args} name='story' label={args.hiddenLabel ? '' : args.label} />;
};

export const InputTemplate = Template.bind({});
InputTemplate.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  helperText: 'Supporting text',
  error: false,
  hiddenLabel: false,
  disabled: false,
  // @ts-ignore
  InputProps: 'both',
};
