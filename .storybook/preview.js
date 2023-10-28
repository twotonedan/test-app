import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../src/theme';
import { FormProvider, useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';

export const decorators = [
  Story => {
    const [queryClient] = useState(() => new QueryClient());
    const form = useForm();

    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NiceModal.Provider>
            <FormProvider {...form}>
              <Story />
            </FormProvider>
          </NiceModal.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
  },
};
