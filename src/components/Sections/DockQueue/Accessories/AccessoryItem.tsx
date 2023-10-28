import theme from '@/theme';
import { viewListStatusIndicator } from '@/types/viewListElement';
import { Box, Button, styled, Typography, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { IBookingAccessory } from '@/types/dockQueue';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

const StyledButtonRow = styled(Button)`
  display: flex;
  width: 100%;
  text-align: left;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px ${theme.palette.customColors.gray} solid;
  padding: 39px 16px;
  &.is-selected {
    border: 1px ${theme.palette.customColors.steelBlue} solid;
  }
`;

const StyledColumn = styled(Box)`
  display: flex;
  flex-direction: column;
`;

function styleNameButton(tag: string | undefined, t: (arg0: string) => string) {
  switch (tag) {
    case viewListStatusIndicator.private:
      return {
        'background-color': theme.palette.customButtons.viewList.private,
        color: theme.palette.customColors.white,
        name: t('private'),
      };
    case viewListStatusIndicator.mandatory:
      return {
        'background-color': theme.palette.customButtons.viewList.private,
        color: theme.palette.customColors.white,
        name: t('mandatory'),
      };
    case viewListStatusIndicator.default:
      return {
        'background-color': theme.palette.customButtons.viewList.default,
        color: theme.palette.customColors.white,
        name: t('default'),
      };
    case viewListStatusIndicator.standard:
      return {
        'background-color': theme.palette.customButtons.viewList.standard,
        color: theme.palette.customColors.white,
        name: t('standard'),
      };
    default:
      return {
        'background-color': theme.palette.customButtons.viewList.default,
        color: theme.palette.customColors.white,
        name: 'N/A',
      };
  }
}

type Props = {
  accessory: IBookingAccessory;
  onClick: (id: string) => void;
};
const AccessoryItem = ({ accessory, onClick }: Props) => {
  const { t } = useTranslation('common');
  const buttonStylesName = styleNameButton(accessory?.tag, t);

  const StatusIndicator = styled(Box)`
    background-color: ${buttonStylesName['background-color']};
    color: ${buttonStylesName.color};
    font-size: 14px;
    border-radius: 999px;
    padding: 6px 8px;
  `;

  return (
    <Box component='div'>
      <StyledButtonRow className={accessory.isSelected ? 'is-selected' : ''} onClick={() => onClick(accessory.id)}>
        <StyledColumn component='span'>
          <Typography fontWeight={700} component='span' fontSize={16} variant='body1'>
            {accessory.title}
          </Typography>
          <Typography fontSize={14} component='span' variant='body1'>
            ${accessory.rate.toFixed(2)}/hr
          </Typography>
        </StyledColumn>
        <StyledColumn component='span'>
          {accessory.tag ? (
            <StatusIndicator component='span'>{buttonStylesName.name}</StatusIndicator>
          ) : (
            <DeleteOutline sx={{ color: theme.palette.error.main }} fontSize='small' />
          )}
          <Grid>
            Location
            <EditOutlined sx={{ marginLeft: '5px', color: theme.palette.customColors.steelBlue }} fontSize='small' />
          </Grid>
        </StyledColumn>
      </StyledButtonRow>
    </Box>
  );
};

export default AccessoryItem;
