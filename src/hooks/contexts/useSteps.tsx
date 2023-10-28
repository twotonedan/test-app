import constate from 'constate';
import { useState } from 'react';

type Props = {
  steps: string[];
  initialStep: number;
};

const useStepsContext = ({ steps, initialStep }: Props) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);

  const nextStep = () => {
    if (currentStepIndex === steps.length - 1) return;
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const prevStep = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const currentStep = steps[currentStepIndex];

  return { steps, currentStepIndex, currentStep, nextStep, prevStep };
};

export const [StepsProvider, useSteps] = constate(useStepsContext);
