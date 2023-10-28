import { IColumn, IActionProps, IBooking, ICardView } from '@/types/dockQueue';
import { ReusableCardType } from '@/types/reusableCards';
import { Drawer, Grid, styled } from '@mui/material';
import theme from '@/theme';

type IMapCardProps = {
  view: ICardView;
  entry?: IBooking;
  actionsMap: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (id: string) => void | any;
  };
};
export const sortFunction = (
  a: IBooking,
  b: IBooking,
  currentCardView: ICardView,
  sortField: string,
  sortOrder: string
) => {
  const sortFieldFormatter = currentCardView?.columns?.find(x => x.field === sortField)?.formatter;
  const valueA = sortFieldFormatter
    ? sortFieldFormatter({
        value: a?.[sortField],
        row: a,
      })
    : '';
  const valueB = sortFieldFormatter
    ? sortFieldFormatter({
        value: b?.[sortField],
        row: b,
      })
    : '';
  if (sortOrder === 'asc') {
    return valueA < valueB ? -1 : 1;
  }
  return valueA < valueB ? 1 : -1;
};

export const mapCardProps = ({ view, entry, actionsMap }: IMapCardProps): ReusableCardType => {
  const nameColumn = view?.columns.find((column: IColumn) => column.field === 'customerName');
  const bookingIdColumn = view?.columns.find((column: IColumn) => column.field === 'bookingId');
  return {
    name:
      nameColumn?.formatter && entry?.[nameColumn.field]
        ? nameColumn.formatter({ value: entry[nameColumn.field], row: entry })
        : nameColumn?.example || '',
    id:
      bookingIdColumn?.formatter && entry?.[bookingIdColumn.field]
        ? bookingIdColumn.formatter({ value: entry[bookingIdColumn.field], row: entry })
        : bookingIdColumn?.example || '',
    fields:
      view?.columns
        ?.filter(
          (column: IColumn) => !(column.field === 'bookingId' || column.field === 'customerName' || !column.show)
        )
        ?.map((column: IColumn) => ({
          headerName: column.headerName,
          value:
            entry && column.formatter ? column?.formatter({ value: entry[column.field], row: entry }) : column.example,
        })) || [],
    cardButtons:
      view?.actions
        ?.filter((x: IActionProps) => x.show)
        ?.map((action: IActionProps) => ({
          buttonLabel: action.name,
          onClick: () => {
            const onClickFunction = actionsMap?.[action.id];
            if (onClickFunction && entry?.id) onClickFunction(entry.id);
          },
        })) || [],
  };
};

export const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    background-color: ${theme.palette.common.white};
    width: auto;
    border-radius: 0px 0px 16px 16px;
    box-shadow: none;

    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
export const StyledContainer = styled(Grid)`
  padding: 15px;
  > div {
    margin: 0 0 15px;
  }
`;
export const StyledOptions = styled(Grid)`
  padding: 10px;
  > div {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
  }
`;
