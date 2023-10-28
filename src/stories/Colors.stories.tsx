import { Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import ColorsPage from './ColorsPage';

export default {
  title: 'Theme/Colors',
  component: ColorsPage,
} as Meta<typeof ColorsPage>;

const Template: StoryFn<typeof Typography> = args => <ColorsPage {...args} />;

export const Colors = Template.bind({});
