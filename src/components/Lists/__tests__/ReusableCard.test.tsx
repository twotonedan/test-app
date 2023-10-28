import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReusableCard from '../ReusableCard';
import { REUSABLE_CARDS, REUSABLE_CARDS_DRAWER_OPTIONS } from '@/mock/REUSABLE_CARDS';
import userEvent from '@testing-library/user-event';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('Reusable Card Component', () => {
  test('Card renders, verify that customer name is used as header ', () => {
    render(<ReusableCard cardProps={REUSABLE_CARDS[0]} />);

    expect(screen.getByTestId('headerElement')).toHaveTextContent(REUSABLE_CARDS[0].name);
  });

  test('Open drawer, verify-drawer present', async () => {
    render(<ReusableCard cardProps={REUSABLE_CARDS[0]} drawerOptions={REUSABLE_CARDS_DRAWER_OPTIONS[0]} />);

    await act(async () => {
      await userEvent.click(screen.getByTestId('moreIconButton'));
    }
    );

    expect(screen.getByTestId('drawer')).toBeInTheDocument();
  });

});
