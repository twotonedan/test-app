import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import AccessoryItem from './AccessoryItem';
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

describe('AccessoryItem', () => {
  test('onClick', async () => {
    const onClick = jest.fn();
    render(<I18nextProvider i18n={i18n}>
        <AccessoryItem onClick={onClick} accessory={ACCESSORIES[0]} />
    </I18nextProvider>
    );
    expect(screen.queryByText('Bike Rack')).toBeInTheDocument();
    userEvent.click(screen.getByText('Bike Rack'));
    await waitFor(() => {
      expect(onClick).toBeCalled();
    });
  });
});
