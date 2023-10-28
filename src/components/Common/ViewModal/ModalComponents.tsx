import { Grid, IconButton, Button, Card } from '@mui/material';
import styled from '@emotion/styled';
import { useTranslation } from 'next-i18next';
import DetailHeader from '@/components/Sections/Common/DetailHeader';
import FooterDrawer from '@/components/Common/FooterDrawer';
import theme from '@/theme/theme';
import Switch from '@mui/material/Switch';
import { useController, useFormContext } from 'react-hook-form';
import { InputType } from '@/types/enums';
import { DeleteOutline } from '@mui/icons-material';
import Input from '@/components/Common/Input';
import ReusableCard from '@/components/Lists/ReusableCard';
import { IColumn, IActionProps } from '@/types/dockQueue';
import TableViewDnd from './TableViewDnd';
import CardViewDnd from './CardViewDnd';
import Sorting from '../Sorting';

const StyledDetailHeader = styled(DetailHeader)`
  display: block;
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;
type IHeaderProps = {
  handleOnClose: () => void;
  title: string;
};
export const Header = ({ handleOnClose, title }: IHeaderProps) => {
  return <StyledDetailHeader onClickBack={handleOnClose} title={title} />;
};
const StyledContainer = styled(Grid)`
  padding: 10px;
  > div {
    margin: 5px;
  }
`;
const StyledTrashButton = styled(IconButton)`
  color: ${theme.palette.error.main};
  font-size: 1rem;
  font-weight: 600;
  span {
    margin-left: 5px;
  }
`;
type IBodyProps = {
  deleteView: () => void;
  isCardView: boolean;
  modalType: string;
};
export const Body = ({ deleteView, isCardView, modalType }: IBodyProps) => {
  const { t } = useTranslation('actions');
  const { control } = useFormContext();
  const { field: privateField } = useController({ name: 'isPrivate', control });
  const { field: columnsField } = useController({ name: 'columns', control });
  const { field: actionsField } = useController({ name: 'actions', control });
  const { field: sortField } = useController({ name: 'sortField', control });
  const { field: sortOrder } = useController({ name: 'sortOrder', control });
  const cardProps = {
    name: columnsField.value.find((column: IColumn) => column.field === 'customerName')?.example || '',
    id: columnsField.value.find((column: IColumn) => column.field === 'bookingId')?.example || '',
    fields: columnsField.value
      ?.filter((column: IColumn) => column.show)
      ?.map((column: IColumn) => ({
        headerName: column.headerName,
        value: column.example || '',
      })),
    cardButtons: actionsField.value
      ?.filter((x: IActionProps) => x.show)
      ?.map((action: IActionProps) => ({
        buttonLabel: action.name,
        link: '',
      })),
  };
  return (
    <StyledContainer container>
      {isCardView && (
        <Card style={{ minWidth: '300px' }}>
          <ReusableCard cardProps={cardProps} />
        </Card>
      )}
      <Grid item xs={12}>
        <b>{t('tableView.viewName')}</b>
      </Grid>
      <Input type={InputType.STRING} label='Name' name='name' fullWidth />
      <Grid item xs={12}>
        <Switch
          color='primary'
          checked={!!privateField.value}
          onChange={() => privateField.onChange(!privateField.value)}
        />
        <span style={{ marginLeft: '10px' }}>{t('tableView.private')}</span>
      </Grid>
      {!isCardView && (
        <>
          <Grid item xs={12} style={{ margin: '5px 0 0' }}>
            <b>{t('tableView.tableConfiguration')}</b>
          </Grid>
          <Grid item xs={12} style={{ margin: '0' }}>
            {t(`tableView.selectColumns`)}
          </Grid>
        </>
      )}
      <Grid item xs={12} style={{ margin: '10px 0' }}>
        {isCardView ? (
          <CardViewDnd
            columns={columnsField.value}
            updateColumns={columnsField.onChange}
            actions={actionsField.value}
            updateActions={actionsField.onChange}
          />
        ) : (
          <TableViewDnd items={columnsField.value} updateItems={columnsField.onChange} />
        )}
      </Grid>
      <Sorting
        columns={columnsField.value}
        sortField={sortField.value}
        setSortField={sortField.onChange}
        sortOrder={sortOrder.value}
        setSortOrder={sortOrder.onChange}
      />
      {modalType === 'edit' && (
        <Grid item xs={12}>
          <StyledTrashButton onClick={deleteView}>
            <DeleteOutline />
            <span>{t('tableView.deleteView')}</span>
          </StyledTrashButton>
        </Grid>
      )}
    </StyledContainer>
  );
};

type IFooterProps = {
  onSave?: () => void;
  onCancel?: () => void;
};
const ButtonWrapper = styled(Grid)`
  padding: 0 10px;
  button {
    width: 100%;
  }
`;
export const Footer = ({ onSave, onCancel }: IFooterProps) => {
  const { t } = useTranslation(['actions']);
  return (
    <FooterDrawer>
      <Grid container>
        <ButtonWrapper item xs={6}>
          <Button onClick={onCancel} variant='outlined'>
            {t('cancel')}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper item xs={6}>
          <Button onClick={onSave} variant='contained'>
            {t('save')}
          </Button>
        </ButtonWrapper>
      </Grid>
    </FooterDrawer>
  );
};
