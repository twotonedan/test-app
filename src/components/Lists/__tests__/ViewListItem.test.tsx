import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ViewListItem from '../ViewListItem';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { WATER_QUEUE_CARD_VIEWS } from '@/mock/DOCK_QUEUE';

i18n.use(initReactI18next).init({
    lng: 'cimode',
    ns: ['translations'],
    defaultNS: 'translations',

    interpolation: {
        escapeValue: false, // not needed for react!!
    },

    resources: { en: { translations: {} } },
});

jest.mock('next/font/google', () => ({
  Maven_Pro: () => ({
    style: {
      fontFamily: 'Maven Pro',
    },
  }),
}));


describe('View List Item Tests', () => {

  test('Render a View List Item with a status indicator', async ()  => {
    const handleOnClick = jest.fn(()=>{});

     render(
        <I18nextProvider i18n={i18n}>
            <ViewListItem data={WATER_QUEUE_CARD_VIEWS[0]} handleOnClick={handleOnClick} />
        </I18nextProvider>
        );
    
    screen.getByText(WATER_QUEUE_CARD_VIEWS[0].name);
    screen.getByText(WATER_QUEUE_CARD_VIEWS[0].subName);
    
    await act(async () => {
        await userEvent.click(screen.getByRole('button'));
    });
    expect(handleOnClick).toHaveBeenCalledTimes(1);
  });

  test('Render a View List Item without a status indicator', async ()  => {
    const handleOnClick = jest.fn(()=>{});

     render(
        <I18nextProvider i18n={i18n}>
            <ViewListItem data={WATER_QUEUE_CARD_VIEWS[3]} handleOnClick={handleOnClick} />
        </I18nextProvider>
        );
    
    screen.getByText(WATER_QUEUE_CARD_VIEWS[3].name);
    screen.getByText(WATER_QUEUE_CARD_VIEWS[3].subName);
    expect((screen.queryByTestId('statusIndicator'))).toBeNull();
    await act(async () => {
        await userEvent.click(screen.getByRole('button'));
    });
    expect(handleOnClick).toHaveBeenCalledTimes(1);
  });

});