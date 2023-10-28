import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LIST_OF_GUESTS } from '@/mock/LIST_OF_GUESTS';
import UserSelector from '../UserSelector';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

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


describe('User Selector Tests', () => {
    test('Test toggling the booking switch', async () => {
        const WrapperComponent = () => {
            const [bookingSwitch, setBookingSwitch] = useState(true);
            const [guests, setGuests] = useState(LIST_OF_GUESTS);
            return (
                <I18nextProvider i18n={i18n}>
                    <UserSelector bookingSwitch={bookingSwitch} setBookingSwitch = {setBookingSwitch} guests={guests} setGuests={setGuests} />
                </I18nextProvider>
            );
        }

        render(
            <WrapperComponent/>
        );

        expect(screen.queryByTestId('switchControlledDiv')).toBeNull();
        await act( async () => {
            await userEvent.click(screen.getByTestId('bookingSwitch'));    
        });
        expect(screen.getByTestId('switchControlledDiv')).toBeInTheDocument();

        await act( async () => {
            await userEvent.click(screen.getByTestId('bookingSwitch'));    
        });
        expect(screen.queryByTestId('switchControlledDiv')).toBeNull();
    });

    test('test selecting a user', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        let expectedGuests = JSON.parse(JSON.stringify(LIST_OF_GUESTS));
        expectedGuests[0].isUser = true;

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        const guestTextField = screen.getByTestId('guestTextField');

        // Enter in first guests name, press enter
        await act(async () => {
            await userEvent.type(guestTextField, guests[0].fullName);
            await userEvent.type(guestTextField, '{enter}');
        });

        expect(props.setGuests).toHaveBeenCalledWith(expectedGuests);
    });

    test('test opening and closing the addUserForm', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        // press the close button
        await act(async () => {
            await userEvent.click(screen.getByTestId('closeAddUserButton'));
        }
        );
        expect(screen.queryByTestId('addUserForm')).toBeNull();
    });

    test('test adding user to the list', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        const expectedGuests = JSON.parse(JSON.stringify(LIST_OF_GUESTS));
        const expectedGuest = {
            fullName: 'Patrick Pelayo',
            emailAddress: 'patrick.pelayo@storable.com',
            phoneNumber: '714-534-6459',
            isUser: true,
        }
        expectedGuests.push(expectedGuest);

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('fullName'), expectedGuests[4].fullName);
            await userEvent.type(screen.getByTestId('fullName'), '{enter}');
            await userEvent.type(screen.getByTestId('emailAddress'), expectedGuests[4].emailAddress),
            await userEvent.type(screen.getByTestId('emailAddress'), '{enter}');
            await userEvent.type(screen.getByTestId('phoneNumber'), expectedGuests[4].phoneNumber);
            await userEvent.type(screen.getByTestId('phoneNumber'), '{enter}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).toHaveBeenCalledWith(expectedGuests);
    });

    test('attempt to submit new user without required fields', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('fullName'), 'a');
            await userEvent.type(screen.getByTestId('fullName'), '{backspace}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).not.toHaveBeenCalled();
    });

    test('attempt to submit with name only', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('fullName'), 'Patrick Pelayo');
            await userEvent.type(screen.getByTestId('fullName'), '{enter}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).not.toHaveBeenCalled();
    });

    test('attempt to submit with name, email only', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('emailAddress'), 'patrick.pelayo@storable.com');
            await userEvent.type(screen.getByTestId('emailAddress'), '{enter}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).not.toHaveBeenCalled();
    });

    test('attempt to submit with phone', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('phoneNumber'), '714-534-6459');
            await userEvent.type(screen.getByTestId('phoneNumber'), '{enter}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).not.toHaveBeenCalled();
    });

    test('test adding invalid phone', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('fullName'), 'Patrick Pelayo');
            await userEvent.type(screen.getByTestId('fullName'), '{enter}');
            await userEvent.type(screen.getByTestId('emailAddress'), 'Patrick.Pelayo@storable.com'),
            await userEvent.type(screen.getByTestId('emailAddress'), '{enter}');
            await userEvent.type(screen.getByTestId('phoneNumber'), '11111');
            await userEvent.type(screen.getByTestId('phoneNumber'), '{enter}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).not.toHaveBeenCalled();
    });

    test('test adding invalid email', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('fullName'), 'Patrick Pelayo');
            await userEvent.type(screen.getByTestId('fullName'), '{enter}');
            await userEvent.type(screen.getByTestId('emailAddress'), 'Patrick.Pelayostorable.com'),
            await userEvent.type(screen.getByTestId('emailAddress'), '{enter}');
            await userEvent.type(screen.getByTestId('phoneNumber'), '714-534-6459');
            await userEvent.type(screen.getByTestId('phoneNumber'), '{enter}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).not.toHaveBeenCalled();
    });

    test('test adding duplicate', async () => {
        let guests = LIST_OF_GUESTS;
        let setGuests = jest.fn();
        let bookingSwitch = false;
        let setBookingSwitch = jest.fn();

        const props = {
            guests: guests,
            setGuests: setGuests,
            bookingSwitch: bookingSwitch,
            setBookingSwitch: setBookingSwitch,
        }

        render(
            <I18nextProvider i18n={i18n}>
                <UserSelector {...props} />
            </I18nextProvider>
        );

        //  Press the not on list button
        await act(async () => {
            await userEvent.click(screen.getByTestId('notOnListTextButton'));
        });
        screen.getByTestId('addUserForm');

        
        await act(async () => {
            await userEvent.type(screen.getByTestId('fullName'), guests[0].fullName);
            await userEvent.type(screen.getByTestId('fullName'), '{enter}');
            await userEvent.type(screen.getByTestId('emailAddress'), guests[0].emailAddress),
            await userEvent.type(screen.getByTestId('emailAddress'), '{enter}');
            await userEvent.type(screen.getByTestId('phoneNumber'), guests[0].phoneNumber);
            await userEvent.type(screen.getByTestId('phoneNumber'), '{enter}');
            // submit form
            await userEvent.click(screen.getByTestId('doneButton'));
        });
        expect(props.setGuests).not.toHaveBeenCalled();
    });
});