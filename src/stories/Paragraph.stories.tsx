import { Typography } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { disableVariants } from '@/utils/disableVariants';

export default {
  title: 'Typography/Paragraph',
  component: Typography,
  argTypes: disableVariants(['fontSize', 'lineHeight', 'fontWeight']),
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = args => <Typography {...args} paragraph fontStyle='normal' />;

export const LargeRegular = Template.bind({});
LargeRegular.args = {
  fontSize: '16px',
  lineHeight: '22px',
  children: 'This is a Large regular Paragraph',
  fontWeight: 400,
};

export const LargeSemibold = Template.bind({});
LargeSemibold.args = {
  ...LargeRegular.args,
  children: 'This is a Large semibold Paragraph',
  fontWeight: 600,
};

export const MediumRegular = Template.bind({});
MediumRegular.args = {
  fontSize: '14px',
  lineHeight: '20px',
  children: 'This is a Medium regular Paragraph',
  fontWeight: 400,
};

export const MediumMedium = Template.bind({});
MediumMedium.args = {
  ...MediumRegular.args,
  children: 'This is a Medium medium Paragraph',
  fontWeight: 500,
};

export const MediumSemibold = Template.bind({});
MediumSemibold.args = {
  ...MediumRegular.args,
  children: 'This is a Medium semibold Paragraph',
  fontWeight: 600,
};

export const SmallRegular = Template.bind({});
SmallRegular.args = {
  fontSize: '12px',
  lineHeight: '16px',
  children: 'This is a Small regular Paragraph',
  fontWeight: 400,
};

export const SmallSemibold = Template.bind({});
SmallSemibold.args = {
  ...SmallRegular.args,
  children: 'This is a Small semibold Paragraph',
  fontWeight: 500,
};
