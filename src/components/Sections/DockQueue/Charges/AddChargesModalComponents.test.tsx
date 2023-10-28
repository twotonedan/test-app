import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header, Body, Footer } from './AddChargesModalComponents';
import { BOOKING_CHARGES } from '@/mock/DOCK_QUEUE';

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

    expect(screen.getByText('addCharges')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')[0]).toBeInTheDocument();
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(handleOnClose).toBeCalled();
    });
  });
  test('Body', async () => {
    const props = {
      charges: BOOKING_CHARGES,
      applyCharge: jest.fn(),
      itemName: 'Pontoon',
      bookingId: '1234',
      customerName: 'Item Group',
    }
    render(<Body {...props}/>);

    expect(screen.queryAllByText('Item Group')).toBeDefined();
    expect(screen.queryAllByText('Pontoon')).toBeDefined();
    expect(screen.queryAllByText('#1234')).toBeDefined();
  });
  test('Footer', async () => {
    const saveAddedCharges = jest.fn();
    const cancel = jest.fn();
    render(<Footer cancel={cancel} saveAddedCharges={saveAddedCharges} />);

    expect(screen.queryByText('cancel')).toBeInTheDocument();
    userEvent.click(screen.getByText('cancel'));
    await waitFor(() => {
      expect(cancel).toBeCalled();
    });
    expect(screen.queryByText('save')).toBeInTheDocument();
    userEvent.click(screen.getByText('save'));
    await waitFor(() => {
      expect(saveAddedCharges).toBeCalled();
    });
  });
});
