import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListCards from '../ListCards';
import { REUSABLE_CARDS } from '@/mock/REUSABLE_CARDS';
import * as api from '../../../hooks/api/useGetReusableCardData'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));

describe('List Cards Component', () => {
  const queryClient = new QueryClient();

  test('Render a list of cards', async () => {
    const reusableCardsMock = jest.spyOn(api, 'getReusableCards');
    reusableCardsMock.mockResolvedValue(REUSABLE_CARDS);

     await render(
        <QueryClientProvider client={queryClient}>
            <ListCards />
        </QueryClientProvider>
        );
    
    await waitFor(() => {
      expect(screen.getByText(REUSABLE_CARDS[0].name)).toBeInTheDocument();
      expect(screen.getByText(REUSABLE_CARDS[0].id)).toBeInTheDocument();
      const numberOfItemLabelsFoundByText = (screen.getAllByText(REUSABLE_CARDS[0].fields[0].headerName)).length;
      const numberOfAnchors = (screen.getAllByRole('button')).length;
      expect(numberOfAnchors).toBe(21);
      expect(numberOfItemLabelsFoundByText).toBe(7);
    });
  });

});