import { Switch } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Switcher',
  component: Switch,
} as Meta<typeof Switch>;

const SwitchTemplate: StoryFn<typeof Switch> = args => <Switch {...args} />;

export const Switcher = SwitchTemplate.bind({});
Switcher.args = {
  disabled: false,
};
