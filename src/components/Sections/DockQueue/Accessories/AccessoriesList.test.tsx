import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NiceModal from '@ebay/nice-modal-react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import AccessoriesList from './AccessoriesList';
import { ACCESSORIES } from '@/mock/DOCK_QUEUE';

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

describe('AccessoriesList', () => {
  test('closeButtonHandler', async () => {
    const closeButtonHandler = jest.fn();
    const saveAccessories = jest.fn();
    render(<I18nextProvider i18n={i18n}>
      <AccessoriesList accessories={ACCESSORIES} closeButtonHandler={closeButtonHandler} saveAccessories={saveAccessories} />
    </I18nextProvider>
    );

    expect(screen.queryAllByRole('button')[0]).toBeInTheDocument();
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(closeButtonHandler).toBeCalled();
    });
  });
  test('openConfirmModal', async () => {
    const closeButtonHandler = jest.fn();
    const saveAccessories = jest.fn();
    render(<I18nextProvider i18n={i18n}>
      <NiceModal.Provider>
        <AccessoriesList accessories={ACCESSORIES} closeButtonHandler={closeButtonHandler} saveAccessories={saveAccessories} />
      </NiceModal.Provider>
    </I18nextProvider>
    );

    expect(screen.queryByText('done')).toBeInTheDocument();
    userEvent.click(screen.getByText('done'));
    await waitFor(() => {
      expect(screen.queryByText('confirmAccessories')).toBeInTheDocument();
    });
  });
});
