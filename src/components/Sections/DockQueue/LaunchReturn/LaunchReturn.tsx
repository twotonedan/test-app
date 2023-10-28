import theme from '@/theme';
import { Grid, IconButton, styled, Typography, SvgIcon } from '@mui/material';
import { ArrowBackIcon } from '@/assets';
import { useTranslation } from 'next-i18next';
import Stepper from '@/components/Common/Stepper/Stepper';
import { IStepperConfig } from '@/types/dockQueue';

const StyledContainer = styled(Grid)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  margin: 20px auto;
`;

const StyledRow = styled(Grid)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledColumn = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

type LaunchReturnProps = {
  closeButtonHandler: () => void;
};

const LaunchReturn = ({ closeButtonHandler }: LaunchReturnProps) => {
  const { t } = useTranslation('actions');
  const stepperConfig: IStepperConfig = {
    data: {},
    steps: [
      {
        id: 'info-check',
        title: 'Information Check',
        content: <div>Info Check</div>,
      },
      {
        id: 'policies',
        title: 'Policies',
        content: <div>Info Check</div>,
      },
      {
        id: 'equipment',
        title: 'Equipment Inspection',
        content: <div>Info Check</div>,
      },
      {
        id: 'equipment2',
        title: 'Equipment Inspection',
        content: <div>Info Check</div>,
      },
      {
        id: 'equipment3',
        title: 'Equipment Inspection',
        content: <div>Info Check</div>,
      },
    ],
  };
  return (
    <StyledContainer container>
      <StyledRow>
        <StyledColumn>
          <IconButton onClick={closeButtonHandler}>
            <SvgIcon component={ArrowBackIcon} inheritViewBox />
          </IconButton>
        </StyledColumn>
        <StyledColumn>
          <Typography variant='h6'>{t('launch')}</Typography>
        </StyledColumn>
        <StyledColumn />
      </StyledRow>
      <Stepper stepperConfig={stepperConfig} closeButtonHandler={closeButtonHandler} />
    </StyledContainer>
  );
};

export default LaunchReturn;
