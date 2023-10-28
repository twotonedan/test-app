import { Box, styled, Divider, Typography, Grid, IconButton, Drawer } from '@mui/material';
import { nanoid } from 'nanoid';
import { memo, useState } from 'react';
import theme from '@/theme';
import { ReusableCardDrawerOptions, ReusableCardType } from '@/types/reusableCards';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReusableButton from '../Sections/ReusableButton/ReusableButton';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.palette.customColors.lightGray};
  box-shadow: 0px 1px 4px rgba(42, 51, 60, 0.5);
  border-radius: 16px;
  max-width: 400px;
  min-width: 300px;
`;

const StyledSubWrapper = styled(Grid)`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
`;

const StyledFieldValueWrapper = styled(Box)`
  & > * {
    display: flex;
    justify-content: start;
    column-gap: 2px;
  }

  & svg {
    font-size: 19px;
  }

  & .card-column-button {
    padding: 0;
  }

  & .card-column-button:hover {
    background-color: transparent;
  }
  & .booking-id *,
  &.card-column-button.attendant {
    color: ${theme.palette.primary.main};
  }

  & .attendant .delete-outline-icon {
    color: ${theme.palette.error.main};
    margin-left: 6px;
  }
`;

const StyledRow = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background: ${theme.palette.customColors.lightGray};
  justify-content: space-between;
`;

const StyledColumn = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

const StyledSpaceDivider = styled(Divider)`
  display: block;
  width: 100%;
  height: 24px;
`;

const StyledDrawer = styled(Drawer)`
  & .MuiPaper-root {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    left: 0;
    right: 0;
    height: auto;
    top: 33%;
    padding: 16px;
  }
`;

const StyledDrawerRow = styled(Box)`
  display: grid;
  grid-template-columns: 100%;
  row-gap: 8px;

  & button {
    color: ${theme.palette.customText.primary};
  }

  & * {
    font-weight: 600;
  }

  & button:hover {
    background-color: transparent;
  }

  & button svg {
    margin-right: 10px;
    color: ${theme.palette.customText.secondary};
  }
`;

type Props = {
  cardProps: ReusableCardType;
  drawerOptions?: ReusableCardDrawerOptions;
};

const ReusableCard = ({ cardProps, drawerOptions }: Props) => {
  const { name, fields, cardButtons } = cardProps;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const moreIconHandler = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <StyledWrapper data-testid='reusableCard' component='section'>
      <StyledRow>
        <StyledColumn>
          <Typography data-testid='headerElement' variant='h6'>
            {name}
          </Typography>
        </StyledColumn>
        {drawerOptions && (
          <StyledColumn>
            <IconButton
              sx={{ color: theme.palette.primary.main }}
              data-testid='moreIconButton'
              onClick={() => {
                moreIconHandler();
              }}>
              <MoreVertIcon />
            </IconButton>
          </StyledColumn>
        )}
      </StyledRow>
      <StyledSubWrapper container>
        {fields?.map(field => {
          return (
            <StyledColumn item xs={6} md={4} lg={3} key={field.headerName}>
              <Typography fontSize='12px' fontWeight={700} sx={{ color: theme.palette.customColors.labelGray }}>
                {field.headerName}
              </Typography>
              <StyledFieldValueWrapper>{field.value}</StyledFieldValueWrapper>
            </StyledColumn>
          );
        })}
      </StyledSubWrapper>
      <StyledSpaceDivider />
      <StyledSubWrapper container sx={{ mt: 2 }}>
        {cardButtons?.map(button => (
          <StyledColumn item xs={4} sx={{ px: 0.3, mb: 0 }} key={button.buttonLabel}>
            <ReusableButton variant='outlined' buttonLabel={button.buttonLabel} onClickHandler={button.onClick} />
          </StyledColumn>
        ))}
      </StyledSubWrapper>
      <StyledDrawer
        anchor='left'
        open={isDrawerOpen}
        data-testid='drawer'
        onClose={() => {
          moreIconHandler();
        }}>
        <StyledDrawerRow data-testid='drawerTopRow'>
          {drawerOptions?.topRow.map(element => {
            return <Box key={nanoid()}>{element}</Box>;
          })}
        </StyledDrawerRow>
        <Divider sx={{ my: 1 }} />
        <StyledDrawerRow data-testid='drawerBottomRow'>
          {drawerOptions?.bottomRow.map(element => {
            return <Box key={nanoid()}>{element}</Box>;
          })}
        </StyledDrawerRow>
      </StyledDrawer>
    </StyledWrapper>
  );
};

export default memo(ReusableCard);
