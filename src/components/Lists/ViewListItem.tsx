import theme from '@/theme';
import { ICardView } from '@/types/dockQueue';
import { viewListStatusIndicator } from '@/types/viewListElement';
import { Box, Button, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledButtonRow = styled(Button)`
  display: flex;
  width: 100%;
  text-align: left;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px ${theme.palette.customColors.gray} solid;
  padding: 39px 16px;
`;

const StyledColumn = styled(Box)`
  display: flex;
  flex-direction: column;
`;

type Props = {
  data: ICardView;
  handleOnClick: (data: ICardView) => void;
};

function styleNameButton(tag: string | undefined, t: (arg0: string) => string) {
  switch (tag) {
    case viewListStatusIndicator.private:
      return {
        'background-color': theme.palette.customButtons.viewList.private,
        color: theme.palette.customColors.white,
        name: t('private'),
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

const ViewListItem = ({ data, handleOnClick }: Props) => {
  const { t } = useTranslation('common');
  const buttonStylesName = styleNameButton(data?.tag, t);

  const StatusIndicator = styled(Box)`
    background-color: ${buttonStylesName['background-color']};
    color: ${buttonStylesName.color};
    font-size: 14px;
    border-radius: 999px;
    padding: 6px 8px;
  `;

  return (
    <Box component='div'>
      <StyledButtonRow data-testid='viewListItem' onClick={() => handleOnClick(data)}>
        <StyledColumn component='span'>
          <Typography fontWeight={700} component='span' fontSize={16} variant='body1'>
            {data.name}
          </Typography>
          <Typography fontSize={14} component='span' variant='body1'>
            {data.subName}
          </Typography>
        </StyledColumn>
        {!!data.tag && (
          <StyledColumn data-testid='statusIndicator' component='span'>
            <StatusIndicator component='span'>{buttonStylesName.name}</StatusIndicator>
          </StyledColumn>
        )}
      </StyledButtonRow>
    </Box>
  );
};

export default ViewListItem;
