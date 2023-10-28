import '@testing-library/jest-dom';
import DndUtils from './CardViewDndUtils';
import { CARD_VIEW_DATA } from '@/mock/CARD_VIEW';
import { DOCK_QUEUE_COLUMNS } from '@/mock/DOCK_QUEUE';
import { IColumn } from '@/types/dockQueue';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('CardViewDndUtils', () => {
  test('onDragActionEnd', async () => {
    const setActions = jest.fn();
    const source = {
      index: 0,
      droppableId: 'actions'
    }
    const destination = {
      index: 1,
      droppableId: 'actions'
    }
    DndUtils.onDragActionEnd({
      source,
      destination,
      actions: CARD_VIEW_DATA.actions,
      setActions
    })
    const expected = [
      { id: "2", name: "Return", show: false },
      { id: "1", name: "Assign", show: true },
      { id: "3", name: "Add Accessory", show: true }
    ]
    expect(setActions).toBeCalledWith(expected);
  });
  test('onDragColumnEnd', async () => {
    const setColumns = jest.fn();
    const source = {
      index: 0,
      droppableId: 'Columns'
    }
    const destination = {
      index: 1,
      droppableId: 'Columns'
    }
    DndUtils.onDragColumnEnd({
      source,
      destination,
      columns: DOCK_QUEUE_COLUMNS,
      setColumns
    })
    expect(setColumns).toBeCalled();
  });
});
