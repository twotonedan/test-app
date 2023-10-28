import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header, Body, Footer } from './ListFilterModalComponents';
import { IFilterModalProps } from '@/types/dockQueue';
import { LIST_FILTER } from '@/mock/LIST_FILTER';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('ModalComponents', () => {
  test('Header', async () => {
    const handleOnClose = jest.fn();

    render(<Header handleOnClose={handleOnClose} />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')[0]).toBeInTheDocument();
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(handleOnClose).toBeCalled();
    });
  });
  test('Body', async () => {
    const props: IFilterModalProps = {
      data: {
        ...LIST_FILTER,
        setFilterFields: jest.fn(),
        setSortField: jest.fn(),
        setSortOrder: jest.fn(),
      },
    }
    render(<Body {...props}/>);

    expect(screen.queryAllByText('Item Group')).toBeDefined();
    expect(screen.queryAllByText('Pontoon')).toBeDefined();
    expect(screen.queryAllByText('Clear')).toBeDefined();
  });
  test('Footer', async () => {
    const applyFilters = jest.fn();
    const clearAllFilters = jest.fn();
    render(<Footer applyFilters={applyFilters} clearAllFilters={clearAllFilters} />);

    expect(screen.queryByText('applyFilters')).toBeInTheDocument();
    userEvent.click(screen.getByText('applyFilters'));
    await waitFor(() => {
      expect(applyFilters).toBeCalled();
    });
    expect(screen.queryByText('clearAll')).toBeInTheDocument();
    userEvent.click(screen.getByText('clearAll'));
    await waitFor(() => {
      expect(clearAllFilters).toBeCalled();
    });
  });
});
