import '@testing-library/jest-dom';
import DndUtils from './TableViewDndUtils';
import { TABLE_VIEW_DATA } from '@/mock/TABLE_VIEW';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('TableViewDndUtils', () => {
  test('onDragEnd pinned to pinned', async () => {
    const setPinnedItems = jest.fn();
    const setUnpinnedItems = jest.fn();
    const source = {
      index: 0,
      droppableId: 'pinned'
    }
    const destination = {
      index: 1,
      droppableId: 'pinned'
    }
    DndUtils.onDragEnd({
      source,
      destination,
      pinnedItems: TABLE_VIEW_DATA.items.filter(x => x.pinned),
      setPinnedItems,
      unpinnedItems: TABLE_VIEW_DATA.items.filter(x => !x.pinned),
      setUnpinnedItems,
    })
    const expectedPinned = [
      {
        id: '3',
        name: 'Name',
        show: false,
        pinned: true,
      },
      {
        id: '1',
        name: 'ID',
        show: true,
        pinned: true,
      },
    ]
    expect(setPinnedItems).toBeCalledWith(expectedPinned);
    expect(setUnpinnedItems).not.toBeCalled();
  });
  test('onDragEnd unpinned to unpinned', async () => {
    const setPinnedItems = jest.fn();
    const setUnpinnedItems = jest.fn();
    const source = {
      index: 0,
      droppableId: 'unpinned'
    }
    const destination = {
      index: 1,
      droppableId: 'unpinned'
    }
    DndUtils.onDragEnd({
      source,
      destination,
      pinnedItems: TABLE_VIEW_DATA.items.filter(x => x.pinned),
      setPinnedItems,
      unpinnedItems: TABLE_VIEW_DATA.items.filter(x => !x.pinned),
      setUnpinnedItems,
    })
    const expectedUnpinned = [
      {
        id: '4',
        name: 'Address',
        show: true,
        pinned: false,
      },
      {
        id: '2',
        name: 'Email',
        show: true,
        pinned: false,
      },
      {
        id: '5',
        name: 'Phone',
        show: true,
        pinned: false,
      },
    ]
    expect(setUnpinnedItems).toBeCalledWith(expectedUnpinned);
    expect(setPinnedItems).not.toBeCalled();
  });
  test('onDragEnd pinned to unpinned', async () => {
    const setPinnedItems = jest.fn();
    const setUnpinnedItems = jest.fn();
    const source = {
      index: 0,
      droppableId: 'pinned'
    }
    const destination = {
      index: 0,
      droppableId: 'unpinned'
    }
    DndUtils.onDragEnd({
      source,
      destination,
      pinnedItems: TABLE_VIEW_DATA.items.filter(x => x.pinned),
      setPinnedItems,
      unpinnedItems: TABLE_VIEW_DATA.items.filter(x => !x.pinned),
      setUnpinnedItems,
    })
    const expectedPinned = [
      {
        id: '3',
        name: 'Name',
        show: false,
        pinned: true,
      },
    ]
    const expectedUnpinned = [
      {
        id: '1',
        name: 'ID',
        show: true,
        pinned: false,
      },
      {
        id: '2',
        name: 'Email',
        show: true,
        pinned: false,
      },
      {
        id: '4',
        name: 'Address',
        show: true,
        pinned: false,
      },
      {
        id: '5',
        name: 'Phone',
        show: true,
        pinned: false,
      },
    ]
    expect(setPinnedItems).toBeCalledWith(expectedPinned);
    expect(setUnpinnedItems).toBeCalledWith(expectedUnpinned);
  });
  test('onDragEnd unpinned to pinned', async () => {
    const setPinnedItems = jest.fn();
    const setUnpinnedItems = jest.fn();
    const source = {
      index: 0,
      droppableId: 'unpinned'
    }
    const destination = {
      index: 0,
      droppableId: 'pinned'
    }
    DndUtils.onDragEnd({
      source,
      destination,
      pinnedItems: TABLE_VIEW_DATA.items.filter(x => x.pinned),
      setPinnedItems,
      unpinnedItems: TABLE_VIEW_DATA.items.filter(x => !x.pinned),
      setUnpinnedItems,
    })
    const expectedPinned = [
      {
        id: '2',
        name: 'Email',
        show: true,
        pinned: true,
      },
      {
        id: '1',
        name: 'ID',
        show: true,
        pinned: true,
      },
      {
      id: '3',
      name: 'Name',
      show: false,
      pinned: true,
      },
    ]
    const expectedUnpinned = [
      {
        id: '4',
        name: 'Address',
        show: true,
        pinned: false,
      },
      {
        id: '5',
        name: 'Phone',
        show: true,
        pinned: false,
      },
    ]
    expect(setPinnedItems).toBeCalledWith(expectedPinned);
    expect(setUnpinnedItems).toBeCalledWith(expectedUnpinned);
  });
});
