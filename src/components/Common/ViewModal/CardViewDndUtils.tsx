import Grid from '@mui/material/Grid';
import { DraggableLocation } from '@hello-pangea/dnd';
import styled from '@emotion/styled';
import theme from '@/theme/theme';
import { IColumn, IActionProps } from '@/types/dockQueue';

const StyledGrid = styled(Grid)`
  width: 100%;
  margin: 2px 0;
  padding: 2px 10px;
  &:hover {
    cursor: pointer;
  }
  > div {
    margin: auto;
  }
`;
const StyledTitleText = styled.b`
  color: ${theme.palette.customColors.labelGray};
  text-transform: uppercase;
`;
type IOnDragActionEndProps = {
  source: DraggableLocation;
  destination: DraggableLocation | null;
  actions: IActionProps[];
  setActions: (actions: IActionProps[]) => void;
};
const onDragActionEnd = ({ source, destination, actions, setActions }: IOnDragActionEndProps) => {
  const oldIndex = source?.index;
  const newIndex = destination?.index;
  const matchingItem = actions[oldIndex];

  const filteredActions = actions.filter((x, i) => i !== oldIndex);
  const newActions = [...filteredActions.slice(0, newIndex), matchingItem, ...filteredActions.slice(newIndex)];
  setActions(newActions);
};
type IOnDragColumnEndProps = {
  source: DraggableLocation;
  destination: DraggableLocation | null;
  columns: IColumn[];
  setColumns: (columns: IColumn[]) => void;
};
const onDragColumnEnd = ({ source, destination, columns, setColumns }: IOnDragColumnEndProps) => {
  const oldIndex = source?.index;
  const newIndex = destination?.index;
  const matchingItem = columns[oldIndex];

  const filteredColumns = columns.filter((x, i) => i !== oldIndex);
  const newColumns = [...filteredColumns.slice(0, newIndex), matchingItem, ...filteredColumns.slice(newIndex)];
  setColumns(newColumns);
};

export default {
  StyledGrid,
  StyledTitleText,
  onDragActionEnd,
  onDragColumnEnd,
};
