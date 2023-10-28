import Grid from '@mui/material/Grid';
import { DraggableLocation } from '@hello-pangea/dnd';
import styled from '@emotion/styled';
import { IColumn } from '@/types/dockQueue';

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
const IconWrapper = styled.div`
  paddingLeft: 25px;
  position:'relative;
  color: theme.palette.customColors.labelGray;
`;
type IOnDragEndProps = {
  source: DraggableLocation;
  destination: DraggableLocation | null;
  pinnedItems: IColumn[];
  setPinnedItems: (pinnedItems: IColumn[]) => void;
  unpinnedItems: IColumn[];
  setUnpinnedItems: (unpinnedItems: IColumn[]) => void;
};
const onDragEnd = ({
  source,
  destination,
  pinnedItems,
  setPinnedItems,
  unpinnedItems,
  setUnpinnedItems,
}: IOnDragEndProps) => {
  const newId = destination?.droppableId;
  const oldId = source?.droppableId;
  const oldIndex = source?.index;
  const newIndex = destination?.index;
  const matchingItem = oldId === 'pinned' ? pinnedItems[oldIndex] : unpinnedItems[oldIndex];
  if (oldId === 'pinned' && newId === 'unpinned') {
    const newPinnedItems = pinnedItems.filter((x, i) => i !== oldIndex);
    const newItems = [
      ...unpinnedItems.slice(0, newIndex),
      { ...matchingItem, pinned: false },
      ...unpinnedItems.slice(newIndex),
    ];
    setPinnedItems(newPinnedItems);
    setUnpinnedItems(newItems);
  } else if (oldId === 'unpinned' && newId === 'pinned') {
    const newItems = unpinnedItems.filter((x, i) => i !== oldIndex);
    const newPinnedItems = [
      ...pinnedItems.slice(0, newIndex),
      { ...matchingItem, pinned: true },
      ...pinnedItems.slice(newIndex),
    ];
    setUnpinnedItems(newItems);
    setPinnedItems(newPinnedItems);
  } else if (oldId === 'unpinned' && newId === 'unpinned') {
    const filteredItems = unpinnedItems.filter((x, i) => i !== oldIndex);
    const newItems = [...filteredItems.slice(0, newIndex), matchingItem, ...filteredItems.slice(newIndex)];
    setUnpinnedItems(newItems);
  } else if (oldId === 'pinned' && newId === 'pinned') {
    const filteredPinnedItems = pinnedItems.filter((x, i) => i !== oldIndex);
    const newPinnedItems = [
      ...filteredPinnedItems.slice(0, newIndex),
      matchingItem,
      ...filteredPinnedItems.slice(newIndex),
    ];
    setPinnedItems(newPinnedItems);
  }
};

export default {
  onDragEnd,
  StyledGrid,
  IconWrapper,
};
