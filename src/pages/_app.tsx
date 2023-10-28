import { useEffect, useState } from 'react';
import theme from '@/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient } from '@tanstack/react-query';
import { UserOptionsProvider } from '@/hooks/contexts/useUserOptions';
import LocalizationHandler from '@/components/Providers/LocalizationHandler';
import { appWithTranslation } from 'next-i18next';
import NiceModal from '@ebay/nice-modal-react';
import { CartDataProvider } from '@/hooks/contexts/useCartData';
import { CalculatePriceProvider } from '@/hooks/contexts/useCalculatePrice';
import { NextAdapter } from 'next-query-params';
import { QueryParamProvider } from 'use-query-params';
import { UserStateProvider } from '@/hooks/contexts/useUserState';
import dynamic from 'next/dynamic';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Toaster = dynamic(() => import('react-hot-toast').then(c => c.Toaster), {
  ssr: false,
});

const clientSideEmotionCache = createEmotionCache();
interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

function App({ emotionCache, Component, pageProps }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 2000 * 60 * 60 * 1,
            retry: 0,
          },
        },
      })
  );
  const persister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  }, []);
  return (
    <CacheProvider value={emotionCache || clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryParamProvider adapter={NextAdapter}>
          <NiceModal.Provider>
            <PersistQueryClientProvider
              client={queryClient}
              persistOptions={{ persister }}
              onSuccess={() => {
                // resume mutations after initial restore from localStorage was successful
                queryClient.resumePausedMutations().then(() => {
                  queryClient.invalidateQueries();
                });
              }}>
              <Hydrate state={pageProps.dehydratedState}>
                <UserStateProvider>
                  <UserOptionsProvider>
                    <LocalizationHandler>
                      <CartDataProvider>
                        <CalculatePriceProvider>
                          <Toaster position='top-center' />
                          <Component {...pageProps} />
                          <ReactQueryDevtools initialIsOpen />
                        </CalculatePriceProvider>
                      </CartDataProvider>
                    </LocalizationHandler>
                  </UserOptionsProvider>
                </UserStateProvider>
              </Hydrate>
            </PersistQueryClientProvider>
          </NiceModal.Provider>
        </QueryParamProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
