import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import theme from '@/theme/theme';
import { useTranslation } from 'next-i18next';
import { SvgIcon } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import CheckboxComponent from '@/components/Common/Checkbox/Checkbox';
import { SupportedIcons } from '@/constants/icons/supportedIcons';
import DndUtils from '@/components/Common/ViewModal/TableViewDndUtils';
import { IColumn } from '@/types/dockQueue';

type ITableViewDndProps = {
  items: IColumn[];
  updateItems: (items: IColumn[]) => void;
};

const TableViewDnd = ({ items, updateItems }: ITableViewDndProps) => {
  const { t } = useTranslation('actions');
  const [unpinnedItems, setUnpinnedItems] = useState(items.filter(x => !x.pinned));
  const [pinnedItems, setPinnedItems] = useState(items.filter(x => x.pinned));
  type IComponentProps = {
    item: IColumn;
    itemIndex: number;
    pinned?: boolean;
  };
  useEffect(() => {
    updateItems([...pinnedItems, ...unpinnedItems]);
  }, [pinnedItems, unpinnedItems, updateItems]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = ({ item, itemIndex, pinned }: IComponentProps): any => {
    return (
      <DndUtils.StyledGrid container>
        <Grid item xs={1}>
          {itemIndex + 1}
        </Grid>
        <Grid item xs={2}>
          <CheckboxComponent
            label=''
            name=''
            checked={item?.show}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={(e: any) => {
              if (pinned) {
                setPinnedItems(pinnedItems.map((x, i) => (i === itemIndex ? { ...x, show: e.target.checked } : x)));
              } else {
                setUnpinnedItems(unpinnedItems.map((x, i) => (i === itemIndex ? { ...x, show: e.target.checked } : x)));
              }
            }}
          />
        </Grid>
        <Grid item xs={8}>
          {item?.headerName}
        </Grid>
        <Grid item xs={1}>
          <SvgIcon component={SupportedIcons.DRAG_INDICATOR} color='primary' fontSize='small' className='icon' />
        </Grid>
      </DndUtils.StyledGrid>
    );
  };

  return (
    <DragDropContext
      onDragEnd={e =>
        DndUtils.onDragEnd({
          source: e.source,
          destination: e.destination,
          pinnedItems,
          setPinnedItems,
          unpinnedItems,
          setUnpinnedItems,
        })
      }>
      <Droppable droppableId='pinned'>
        {providedDrop => (
          <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
            <div style={{ color: theme.palette.customColors.labelGray }}>{t('FIXED COLUMNS')}</div>
            <DndUtils.IconWrapper
              style={{ paddingLeft: '25px', position: 'relative', color: theme.palette.customColors.labelGray }}>
              <SvgIcon
                style={{ position: 'absolute', top: '1px', left: '0px' }}
                component={SupportedIcons.INFO_OUTLINED}
                fontSize='small'
                className='icon'
              />
              {t('tableView.mobileFirstColumnFixed')}
            </DndUtils.IconWrapper>
            {pinnedItems.map((item: IColumn, index) => (
              // eslint-disable-next-line react/prop-types
              <Draggable key={`${item?.field}drag`} draggableId={`${item?.field}drag`} index={index}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Component item={item} itemIndex={index} pinned />
                  </div>
                )}
              </Draggable>
            ))}
            {providedDrop.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='unpinned'>
        {providedDrop => (
          <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
            <div style={{ color: theme.palette.customColors.labelGray }}>{t('SCROLLABLE COLUMNS')}</div>
            {unpinnedItems.map((item: IColumn, index) => (
              // eslint-disable-next-line react/prop-types
              <Draggable key={`${item?.field}drag`} draggableId={`${item?.field}drag`} index={index}>
                {provided => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Component item={item} itemIndex={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {providedDrop.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableViewDnd;
