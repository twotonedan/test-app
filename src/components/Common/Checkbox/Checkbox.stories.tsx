import Checkbox from '@/components/Common/Checkbox';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      options: ['small', 'medium'],
      control: {
        type: 'select',
        labels: { small: 'small', medium: 'big' },
      },
    },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = args => {
  const [value, setValue] = useState(false);

  return <Checkbox {...args} name='checkbox' checked={value} onClick={() => setValue(!value)} />;
};

export const CheckboxTemplate = Template.bind({});
CheckboxTemplate.storyName = 'Checkbox';
CheckboxTemplate.args = {
  size: 'small',
  label: 'Label',
  disabled: false,
};
