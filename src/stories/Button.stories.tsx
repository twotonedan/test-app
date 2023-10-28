import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = args => (
  <Button
    {...args}
    endIcon={args.endIcon && <Add color='action' />}
    startIcon={args.startIcon && <Add color='action' />}
  />
);

export const ButtonTemplate = Template.bind({});
ButtonTemplate.storyName = 'Button';
ButtonTemplate.args = {
  variant: 'contained',
  children: 'Enabled',
  disabled: false,
  endIcon: false,
  startIcon: false,
};
