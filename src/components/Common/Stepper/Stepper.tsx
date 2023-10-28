import * as React from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Grid } from '@mui/material';
import { IStepperConfig } from '@/types/dockQueue';

type IProps = {
  stepperConfig: IStepperConfig;
  closeButtonHandler: () => void;
};

const StepperComponent = ({ stepperConfig, closeButtonHandler }: IProps) => {
  const { steps } = stepperConfig;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Grid container>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map(step => (
            <Step key={step.id}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
        <Grid container>
          <Grid item xs={12}>
            <Typography>{steps[activeStep].title}</Typography>
          </Grid>
          <Grid item xs={12}>
            {steps[activeStep].content}
          </Grid>
          <Grid container>
            <Grid item xs={4} justifyContent='center' display='flex'>
              <Button variant='text' disabled={!activeStep} onClick={closeButtonHandler}>
                Continue Later
              </Button>
            </Grid>
            <Grid item xs={4} justifyContent='center' display='flex'>
              <Button variant='outlined' disabled={!activeStep} onClick={handleBack}>
                Back
              </Button>
            </Grid>
            <Grid item xs={4} justifyContent='center' display='flex'>
              <Button onClick={handleNext} variant='contained'>
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
export default StepperComponent;
