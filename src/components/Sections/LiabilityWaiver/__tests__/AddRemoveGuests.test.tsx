import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LIST_OF_GUESTS } from '@/mock/LIST_OF_GUESTS';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Guest } from '@/types/guest';
import { set } from 'lodash';
import AddRemoveGuests from '../AddRemoveGuests';

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


describe('AddRemoveGuests tests', () => {
    test('Test Adding a new guest - no guests initially', async () => {
        let guests: Guest[] = [];
        let setGuests = jest.fn();

        const expectedGuests = [
            {
                fullName: 'Patrick Pelayo',
                emailAddress: 'Patrick.Pelayo@storable.com',
                phoneNumber: '714-534-6459',
                isUser: false,
            }
        ];

        render(
            <I18nextProvider i18n={i18n}>
                <AddRemoveGuests guests={guests} setGuests={setGuests} />
            </I18nextProvider>
        );

        act(() => {
            userEvent.click(screen.getByTestId('collapseController'));
        }
        );

        await act(async () => {
            await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), expectedGuests[0].fullName);
            await userEvent.type(screen.getByTestId('addRemoveGuestEmailAddress'), expectedGuests[0].emailAddress);
            await userEvent.type(screen.getByTestId('addRemoveGuestPhoneNumber'), expectedGuests[0].phoneNumber);
            await userEvent.click(screen.getByTestId('addNewGuestButton'));
        });
        expect(setGuests).toHaveBeenCalledWith(expectedGuests);
    });

    test('test adding additional guest - guests already present', async () => {

        let guests: Guest[] = LIST_OF_GUESTS;
        let setGuests = jest.fn();

        const expectedGuests = JSON.parse(JSON.stringify(LIST_OF_GUESTS));
        const additionalGuest = {
            fullName: 'Patrick Pelayo',
            emailAddress: 'Patrick.Pelayo@storable.com',
            phoneNumber: '714-534-6459',
            isUser: false,
        }
        expectedGuests.push(additionalGuest);

        render(
            <I18nextProvider i18n={i18n}>
                <AddRemoveGuests guests={guests} setGuests={setGuests} />
            </I18nextProvider>
        );

        await act(async () => {
            await userEvent.click(screen.getByTestId('collapseController'));
            await userEvent.click(screen.getByTestId('addAdditionalGuestButton'));
        });

        await act(async () => {
            await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), additionalGuest.fullName);
            await userEvent.type(screen.getByTestId('addRemoveGuestEmailAddress'), additionalGuest.emailAddress);
            await userEvent.type(screen.getByTestId('addRemoveGuestPhoneNumber'), additionalGuest.phoneNumber);
            await userEvent.click(screen.getByTestId('addNewGuestButton'));
        });
        expect(setGuests).toHaveBeenCalledWith(expectedGuests);
    });

    test('test removing a guest', async () => {
        let guests: Guest[] = LIST_OF_GUESTS;
        let setGuests = jest.fn();

        const expectedGuests = (JSON.parse(JSON.stringify(LIST_OF_GUESTS)))
        expectedGuests.shift();
        render(
            <I18nextProvider i18n={i18n}>
                <AddRemoveGuests guests={guests} setGuests={setGuests} />
            </I18nextProvider>
        );

        await act(async () => {
            await userEvent.click(screen.getByTestId('collapseController'));
        });

        expect(screen.getAllByTestId('removeGuestBadge')).toHaveLength(4);

        // remove guest
        await act(async () => {
            await userEvent.click(screen.getAllByTestId('removeGuestBadge')[0]);
        });
        expect(setGuests).toHaveBeenCalledWith(expectedGuests);
    });
});

test('test attempting to add guest with no values', async () => {

    let guests: Guest[] = [];
    let setGuests = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <AddRemoveGuests guests={guests} setGuests={setGuests} />
        </I18nextProvider>
    );

    act(() => {
        userEvent.click(screen.getByTestId('collapseController'));
    }
    );

    await act(async () => {
        await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), 'P');
        await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), '{backspace}');
        await userEvent.click(screen.getByTestId('addNewGuestButton'));
    });
    expect(setGuests).not.toHaveBeenCalled();
});

test('test attempting to add guest with name only', async () => {

    let guests: Guest[] = [];
    let setGuests = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <AddRemoveGuests guests={guests} setGuests={setGuests} />
        </I18nextProvider>
    );

    act(() => {
        userEvent.click(screen.getByTestId('collapseController'));
    }
    );

    await act(async () => {
        await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), 'Patrick Pelayo');
        await userEvent.click(screen.getByTestId('addNewGuestButton'));
    });
    expect(setGuests).not.toHaveBeenCalled();
});

test('test attempting to add guest with phone only', async () => {

    let guests: Guest[] = [];
    let setGuests = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <AddRemoveGuests guests={guests} setGuests={setGuests} />
        </I18nextProvider>
    );

    act(() => {
        userEvent.click(screen.getByTestId('collapseController'));
    }
    );

    await act(async () => {
        await userEvent.type(screen.getByTestId('addRemoveGuestPhoneNumber'), '714-534-6459');
        await userEvent.click(screen.getByTestId('addNewGuestButton'));
    });
    expect(setGuests).not.toHaveBeenCalled();
});

test('test attempting to add guest with email only', async () => {

    let guests: Guest[] = [];
    let setGuests = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <AddRemoveGuests guests={guests} setGuests={setGuests} />
        </I18nextProvider>
    );

    act(() => {
        userEvent.click(screen.getByTestId('collapseController'));
    }
    );

    await act(async () => {
        await userEvent.type(screen.getByTestId('addRemoveGuestEmailAddress'), 'patrick.pelayo@storable.com');
        await userEvent.click(screen.getByTestId('addNewGuestButton'));
    });
    expect(setGuests).not.toHaveBeenCalled();
});

test('test attempting to add guest with invalid phone number', async () => {

    let guests: Guest[] = [];
    let setGuests = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <AddRemoveGuests guests={guests} setGuests={setGuests} />
        </I18nextProvider>
    );

    act(() => {
        userEvent.click(screen.getByTestId('collapseController'));
    }
    );

    await act(async () => {
        await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), 'patrick pelayo');
        await userEvent.type(screen.getByTestId('addRemoveGuestEmailAddress'), 'Patrick.pelayo@storable.com');
        await userEvent.type(screen.getByTestId('addRemoveGuestPhoneNumber'), '1232');
        await userEvent.click(screen.getByTestId('addNewGuestButton'));
    });
    expect(setGuests).not.toHaveBeenCalled();
});

test('test attempting to add guest with invalid email address', async () => {

    let guests: Guest[] = [];
    let setGuests = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <AddRemoveGuests guests={guests} setGuests={setGuests} />
        </I18nextProvider>
    );

    act(() => {
        userEvent.click(screen.getByTestId('collapseController'));
    }
    );

    await act(async () => {
        await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), 'patrick pelayo');
        await userEvent.type(screen.getByTestId('addRemoveGuestEmailAddress'), 'Patrick.pelayostorable.com');
        await userEvent.type(screen.getByTestId('addRemoveGuestPhoneNumber'), '714-534-6459');
        await userEvent.click(screen.getByTestId('addNewGuestButton'));
    });
    expect(setGuests).not.toHaveBeenCalled();
});

test('test attempting to add a duplicate guest', async () => {

    let guests: Guest[] = LIST_OF_GUESTS;
    let setGuests = jest.fn();

    render(
        <I18nextProvider i18n={i18n}>
            <AddRemoveGuests guests={guests} setGuests={setGuests} />
        </I18nextProvider>
    );

    await act(async () => {
        await userEvent.click(screen.getByTestId('collapseController'));
        await userEvent.click(screen.getByTestId('addAdditionalGuestButton'));
    });

    await act(async () => {
        await userEvent.type(screen.getByTestId('addRemoveGuestFullName'), guests[0].fullName);
        await userEvent.type(screen.getByTestId('addRemoveGuestEmailAddress'), guests[0].emailAddress);
        await userEvent.type(screen.getByTestId('addRemoveGuestPhoneNumber'), guests[0].phoneNumber);
        await userEvent.click(screen.getByTestId('addNewGuestButton'));
    });
    expect(setGuests).not.toHaveBeenCalled();
});