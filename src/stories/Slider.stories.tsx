import { Box, Slider } from '@mui/material';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/Slider',
  component: Slider,
} as Meta<typeof Slider>;

const SwitchTemplate: StoryFn<typeof Slider> = args => {
  return (
    <Box maxWidth='400px' padding='20px'>
      <Slider {...args} valueLabelDisplay='auto' />
    </Box>
  );
};

export const SliderComponent = SwitchTemplate.bind({});
SliderComponent.storyName = 'Slider';
SliderComponent.args = {
  disabled: false,
  marks: false,
  step: 1,
};
