import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import NiceModal from '@ebay/nice-modal-react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import AccessoryConfirmModal from './AccessoryConfirmModal';
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

describe('AccessoryConfirmModal', () => {
  test('cancel', async () => {
    const onConfirm = jest.fn();
    render(<I18nextProvider i18n={i18n}>
      <NiceModal.Provider>
        <AccessoryConfirmModal id="confirm-modal" onConfirm={onConfirm} accessories={ACCESSORIES} />
      </NiceModal.Provider>
    </I18nextProvider>
    );
    act(() => {
      NiceModal.show('confirm-modal');
    })
    expect(screen.queryByText('confirmAccessories')).toBeInTheDocument();
    userEvent.click(screen.getByText('cancel'));
    await waitFor(() => {
      expect(screen.queryByText('cancel')).not.toBeInTheDocument();
    });
  });
  test('onConfirm', async () => {
    const onConfirm = jest.fn();
    render(<I18nextProvider i18n={i18n}>
      <NiceModal.Provider>
        <AccessoryConfirmModal id="confirm-modal" onConfirm={onConfirm} accessories={ACCESSORIES} />
      </NiceModal.Provider>
    </I18nextProvider>
    );
    act(() => {
      NiceModal.show('confirm-modal');
    })
    expect(screen.queryByText('save')).toBeInTheDocument();
    userEvent.click(screen.getByText('save'));
    await waitFor(() => {
      expect(onConfirm).toBeCalled();
    });
  });
});
