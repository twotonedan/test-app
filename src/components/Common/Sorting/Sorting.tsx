import { useTranslation } from 'next-i18next';
import { Grid, Button, Select, MenuItem } from '@mui/material';
import theme from '@/theme/theme';
import styled from '@emotion/styled';
import StraightIcon from '@mui/icons-material/Straight';
import { IColumn, ISortDirectionType } from '@/types/dockQueue';

const StyledButton = styled(Button)`
  height: 100%;
  width: 25px;
  min-width: 25px;
  padding: 0;
  margin: 5px 10px 0;
  border-radius: 5px;
  color: ${theme.palette.customColors.labelGray};
  border-color: ${theme.palette.customColors.gray};
`;
const StyledTitleText = styled.b`
  color: ${theme.palette.customColors.labelGray};
  text-transform: uppercase;
`;
const StyledDirectionText = styled.div`
  margin-left: 10px;
  color: ${theme.palette.customColors.labelGray};
`;
type ISortingProps = {
  columns: IColumn[];
  sortField: string;
  setSortField: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: ISortDirectionType) => void;
};
const Sorting = ({ columns, sortField, setSortField, sortOrder, setSortOrder }: ISortingProps) => {
  const { t } = useTranslation('actions');
  const toggleDirection = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const DirectionIcon = styled(StraightIcon)`
    transform: rotate(${sortOrder === 'asc' ? '0deg' : '180deg'});
  `;
  return (
    <Grid container>
      <Grid item xs={12}>
        <StyledTitleText>{t('sorting')}</StyledTitleText>
      </Grid>
      <Grid item xs={10}>
        <Select
          label='Sort By'
          value={sortField}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e): any => setSortField(e.target.value)}
          fullWidth>
          {columns.map(column => (
            <MenuItem key={column.field} value={column.field}>
              {column.headerName}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={2}>
        <StyledButton variant='outlined' onClick={toggleDirection}>
          <DirectionIcon />
        </StyledButton>
      </Grid>
      <Grid item xs={12}>
        <StyledDirectionText>{sortOrder === 'asc' ? t('ascending') : t('descending')}</StyledDirectionText>
      </Grid>
    </Grid>
  );
};

export default Sorting;
