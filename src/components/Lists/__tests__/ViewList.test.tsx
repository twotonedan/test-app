import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ViewList from '../ViewList';
import { VIEW_LIST_CARD_ITEMS } from '@/mock/VIEW_LIST_CARD_ITEMS';
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


describe('View List Tests', () => {

    const mockAddButtonOnClickHandler = jest.fn(() => { });
    const mockAddButtonConfig = {
        onClick: mockAddButtonOnClickHandler,
        label: 'view',
    };

    const mockedOptionsHandler = jest.fn(() => { });
    const mockedCloseButtonHandler = jest.fn(() => { });

    const props = {
        headerTitle: 'Card Views',
        addButtonConfig: mockAddButtonConfig,
        closeButtonHandler: mockedCloseButtonHandler,
        optionsHandler: mockedOptionsHandler,
        data: WATER_QUEUE_CARD_VIEWS,
        autoCompletePlaceholder: 'Search by view name',
    }

    test('Render a full view list, verify all list items have rendered, click all buttons', async () => {

        render(
            <I18nextProvider i18n={i18n}>
                <ViewList {...props} />
            </I18nextProvider>
        );
        expect(screen.getAllByTestId('viewListItem').length).toBe(4);
        screen.getByText(props.headerTitle);
        screen.getByTestId('floatingFixedBottomRightButton');

        await act(async () => {
            await userEvent.click(screen.getByTestId('floatingFixedBottomRightButton'));
            await userEvent.click(screen.getByTestId('closeViewListButton'));
            await userEvent.click((screen.getAllByTestId('viewListItem'))[0]);
        });
        expect(mockAddButtonOnClickHandler).toHaveBeenCalledTimes(1);
        expect(mockedCloseButtonHandler).toHaveBeenCalledTimes(1);
    });

    test('Render a full list, use autocomplete to change the list, verify the new list', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <ViewList {...props} />
            </I18nextProvider>
        );

        // Search should find all items
        await act(async () => {
            await userEvent.type(screen.getByTestId('searchTextInput'), '{enter}');
        });
        expect(screen.queryAllByTestId('viewListItem').length).toBe(4);

        // Search should find nothing
        await act(async () => {
            await userEvent.type(screen.getByTestId('searchTextInput'), 'POIEHG');
            await userEvent.type(screen.getByTestId('searchTextInput'), '{enter}');
        });
        expect(screen.queryAllByTestId('viewListItem').length).toBe(0);

        // Search should find one item
        await act(async () => {
            for (let i = 0; i < 10; i++) {
                await userEvent.type(screen.getByTestId('searchTextInput'), '{backspace}');
            }
            await userEvent.type(screen.getByTestId('searchTextInput'), WATER_QUEUE_CARD_VIEWS[0].name);
            await userEvent.type(screen.getByTestId('searchTextInput'), '{enter}');
        });
        expect(screen.queryAllByTestId('viewListItem').length).toBe(1);
    });

});