import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import { SvgIcon, IconButton } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SupportedIcons } from '@/constants/icons/supportedIcons';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DndUtils from '@/components/Common/ViewModal/CardViewDndUtils';
import { IColumn, IActionProps } from '@/types/dockQueue';

type IColumnComponentProps = {
  item: IColumn;
  itemIndex: number;
};
type IActionComponentProps = {
  item: IActionProps;
  itemIndex: number;
};
type ICardViewDndProps = {
  columns: IColumn[];
  updateColumns: (columns: IColumn[]) => void;
  actions: IActionProps[];
  updateActions: (actions: IActionProps[]) => void;
};
const CardViewDnd = (props: ICardViewDndProps) => {
  const { updateColumns, updateActions, columns: initColumns, actions: initActions } = props;
  const { t } = useTranslation('actions');
  const [columns, setColumns] = useState(initColumns);
  const [actions, setActions] = useState(initActions);
  useEffect(() => {
    updateColumns(columns);
    updateActions(actions);
  }, [columns, actions, updateColumns, updateActions]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ColumnComponent = ({ item, itemIndex }: IColumnComponentProps): any => {
    const toggleShow = () => {
      setColumns(columns.map((x, i) => (i === itemIndex ? { ...x, show: !x.show } : x)));
    };
    return (
      <DndUtils.StyledGrid container>
        <Grid item xs={3}>
          <IconButton onClick={toggleShow}>
            {item?.show ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
          </IconButton>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ActionComponent = ({ item, itemIndex }: IActionComponentProps): any => {
    const toggleShow = () => {
      setActions(actions.map((x, i) => (i === itemIndex ? { ...x, show: !x.show } : x)));
    };
    return (
      <DndUtils.StyledGrid container>
        <Grid item xs={3}>
          <IconButton onClick={toggleShow}>
            {item?.show ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          {item?.name}
        </Grid>
        <Grid item xs={1}>
          <SvgIcon component={SupportedIcons.DRAG_INDICATOR} color='primary' fontSize='small' className='icon' />
        </Grid>
      </DndUtils.StyledGrid>
    );
  };
  return (
    <>
      <DragDropContext
        onDragEnd={e =>
          DndUtils.onDragColumnEnd({ source: e.source, destination: e.destination, columns, setColumns })
        }>
        <Droppable droppableId='columns'>
          {providedDrop => (
            <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
              <DndUtils.StyledTitleText>{t('data')}</DndUtils.StyledTitleText>
              {columns.map((item: IColumn, index) => (
                // eslint-disable-next-line react/prop-types
                <Draggable key={`${item?.field}drag`} draggableId={`${item?.field}drag`} index={index}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ColumnComponent item={item} itemIndex={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {providedDrop.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <DragDropContext
        onDragEnd={e =>
          DndUtils.onDragActionEnd({ source: e.source, destination: e.destination, actions, setActions })
        }>
        <Droppable droppableId='actions'>
          {providedDrop => (
            <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
              <DndUtils.StyledTitleText>{t('actions')}</DndUtils.StyledTitleText>
              {actions.map((action: IActionProps, index) => (
                // eslint-disable-next-line react/prop-types
                <Draggable key={`${action?.id}drag`} draggableId={`${action?.id}drag`} index={index}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ActionComponent item={action} itemIndex={index} />
                    </div>
                  )}
                </Draggable>
              ))}
              {providedDrop.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default CardViewDnd;
