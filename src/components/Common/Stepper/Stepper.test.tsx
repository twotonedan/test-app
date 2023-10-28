import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NiceModal from '@ebay/nice-modal-react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Stepper from './Stepper';
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

describe('Stepper', () => {
  test('closeButtonHandler', async () => {
    const closeButtonHandler = jest.fn();
    const stepperConfig = {
      data: {},
      steps: [
        {
          id: 'info-check',
          title: 'Information Check',
          content: <div>Info Check</div>,
        },
        {
          id: 'policies',
          title: 'Policies',
          content: <div>Info Check</div>,
        },
        {
          id: 'equipment',
          title: 'Equipment Inspection',
          content: <div>Info Check</div>,
        },
        {
          id: 'equipment2',
          title: 'Equipment Inspection',
          content: <div>Info Check</div>,
        },
        {
          id: 'equipment3',
          title: 'Equipment Inspection',
          content: <div>Info Check</div>,
        },
      ],
    }
    render(<I18nextProvider i18n={i18n}>
      <Stepper stepperConfig={stepperConfig} closeButtonHandler={closeButtonHandler}/>
    </I18nextProvider>
    );

    expect(screen.queryAllByRole('button')[0]).toBeInTheDocument();
    userEvent.click(screen.queryAllByRole('button')[0]);
    await waitFor(() => {
      expect(closeButtonHandler).toBeCalled();
    });
  });
});
