import { Box } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';
import { disableVariants } from '@/utils/disableVariants';
import Dropdown from './Dropdown';

const storyOptions = [
  { value: 1, label: 'Item 1' },
  { value: 2, label: 'Item 2' },
  { value: 3, label: 'Item 3' },
];

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: disableVariants(['name', 'controllerProps', 'options']),
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = args => {
  return (
    <Box width='167px'>
      <Dropdown {...args} name='storybook-dropdown' labelId='storybook-label' />
    </Box>
  );
};

export const DropdownComponent = Template.bind({});
DropdownComponent.storyName = 'Dropdown';
DropdownComponent.args = {
  label: 'label',
  error: false,
  disabled: false,
  options: storyOptions,
};
