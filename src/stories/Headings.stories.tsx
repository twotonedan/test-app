import { KeyOff } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { disableVariants } from '@/utils/disableVariants';

export default {
  title: 'Typography/Headings',
  component: Typography,
  argTypes: disableVariants(['variant', 'fontSize', 'lineHeight', 'fontWeight']),
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = args => <Typography {...args} />;

export const H1 = Template.bind({});
H1.storyName = 'h1';
H1.args = {
  variant: 'h1',
  children: 'This is a h1 Heading',
};

export const H2Regular = Template.bind({});
H2Regular.storyName = 'h2 Regular';
H2Regular.args = {
  variant: 'h2',
  children: 'This is regular a h2 Heading',
};

export const H2semibold = Template.bind({});
H2semibold.storyName = 'h2 Semibold';
H2semibold.args = {
  variant: 'h2',
  children: 'This is semibold a h2 Heading',
  fontWeight: 600,
};

export const H3Regular = Template.bind({});
H3Regular.storyName = 'h3 Regular';
H3Regular.args = {
  variant: 'h3',
  children: 'This is a regular h3 Heading',
};

export const H3Semibold = Template.bind({});
H3Semibold.storyName = 'h3 Semibold';
H3Semibold.args = {
  variant: 'h3',
  children: 'This is a semibold h3 Heading',
  fontWeight: 600,
};
