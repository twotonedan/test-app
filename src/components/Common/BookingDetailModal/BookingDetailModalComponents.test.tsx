import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartDataProvider } from '@/hooks/contexts/useCartData';
import { Header, Body, Footer } from './BookingDetailModalComponents';
import { BOOKINGS } from '@/mock/DOCK_QUEUE';

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
    const app = <CartDataProvider>
        <Header handleOnClose={handleOnClose} />
      </CartDataProvider>;
    render(app);

    expect(screen.getByText('bookingDetail')).toBeInTheDocument();
    expect(screen.queryAllByRole('button')[0]).toBeInTheDocument();
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(handleOnClose).toBeCalled();
    });
  });
  test('Body', async () => {
    const onAssignToMe = jest.fn();
    render(<Body onAssignToMe={onAssignToMe} booking={BOOKINGS[0]} />);

    expect(screen.getByText('Doug Funny')).toBeInTheDocument();
    expect(screen.getByText('Bike')).toBeInTheDocument();
    expect(screen.getByText('10/13, 7:10 am')).toBeInTheDocument();
  });
  test('Footer', async () => {
    const onAddCharges = jest.fn();
    const onReturn = jest.fn();
    const onQueue = jest.fn();
    render(<Footer onAddCharges={onAddCharges} onReturn={onReturn} onQueue={onQueue} />);

    expect(screen.queryByText('addCharges')).toBeInTheDocument();
    userEvent.click(screen.getByText('addCharges'));
    await waitFor(() => {
      expect(onAddCharges).toBeCalled();
    });
    expect(screen.queryByText('return')).toBeInTheDocument();
    userEvent.click(screen.getByText('return'));
    await waitFor(() => {
      expect(onReturn).toBeCalled();
    });
    expect(screen.queryByText('queue')).toBeInTheDocument();
    userEvent.click(screen.getByText('queue'));
    await waitFor(() => {
      expect(onQueue).toBeCalled();
    });
  });
});
