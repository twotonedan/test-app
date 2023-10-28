import { CheckCircle } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    icon: {
      name: 'startIcon',
      mapping: {
        true: <CheckCircle />,
        false: {},
      },
      control: {
        type: 'boolean',
      },
    },
    onDelete: {
      name: 'endIcon',
      mapping: {
        true: () => {},
        false: undefined,
      },
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta<typeof Chip>;

const Template: StoryFn<typeof Chip> = args => <Chip {...args} clickable size='small' />;

export const ChipComponent = Template.bind({});
ChipComponent.storyName = 'Chip';
ChipComponent.args = {
  label: 'Text',
  // @ts-ignore
  onDelete: false,
  // @ts-ignore
  icon: false,
  disabled: false,
};
