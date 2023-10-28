import { RadioGroup } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { disableVariants } from '@/utils/disableVariants';
import RadioButton from './RadioButton';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  argTypes: {
    ...disableVariants(['handleClick']),
    size: {
      options: ['small', 'medium'],
      control: {
        type: 'select',
        labels: { small: 'small', medium: 'big' },
      },
    },
  },
} as Meta<typeof RadioButton>;

const Template: StoryFn<typeof RadioButton> = args => {
  const [value, setValue] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.value === value) {
      setValue('');
    } else {
      setValue(eventTarget.value);
    }
  };

  return (
    <RadioGroup value={value}>
      <RadioButton {...args} handleClick={e => handleClick(e)} />
    </RadioGroup>
  );
};

export const RadioButtonTemplate = Template.bind({});
RadioButtonTemplate.storyName = 'Radio Button';
RadioButtonTemplate.args = {
  size: 'small',
  label: 'Label',
  disabled: false,
};
