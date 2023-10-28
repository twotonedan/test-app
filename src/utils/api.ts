import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import theme from '@/theme/theme';
import { toastDismissTime } from '@/constants';
import { i18n } from 'next-i18next';

export const api = async ({
  url = '',
  method = 'GET',
  headers = {},
  body = {},
  label = 'Data',
  toastSuccess = false,
  successMessage = '',
}) => {
  try {
    return await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url,
      method,
      headers,
      data: body,
    })
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      .then((response: AxiosResponse<any, any> | undefined) => {
        // handle error messages
        if (response?.data?.error && (response?.data?.error !== 'false' || response?.data?.error !== false)) {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          toast.error(`${i18n?.t('common:api.error')}: ${response.data.error}`, {
            style: {
              backgroundColor: theme.palette.error.main,
              color: theme.palette.primary.contrastText,
            },
            duration: toastDismissTime,
          });
          throw response?.data?.error;
        } else {
          if (toastSuccess || successMessage !== '') {
            toast.success(successMessage || `${label} ${i18n?.t('common:api.success')}`, {
              style: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              duration: toastDismissTime,
            });
          }
          return response?.data;
        }
      })
      .catch(error => {
        // handle status errors
        switch (error?.response?.status) {
          case 400:
            toast.error(`${label}: ${i18n?.t('common:api.badRequest')}`, {
              style: {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.primary.contrastText,
              },
              duration: toastDismissTime,
            });
            break;
          case 401:
            toast.error(`${label}: ${i18n?.t('common:api.unauthorized')}`, {
              style: {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.primary.contrastText,
              },
              duration: toastDismissTime,
            });
            break;
          case 403:
            toast.error(`${label}: ${i18n?.t('common:api.forbidden')}`, {
              style: {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.primary.contrastText,
              },
              duration: toastDismissTime,
            });
            break;
          case 404:
            toast.error(`${label}: ${i18n?.t('common:api.notFound')}`, {
              style: {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.primary.contrastText,
              },
              duration: toastDismissTime,
            });
            break;
          case 500:
            toast.error(`${label}: ${i18n?.t('common:api.internalServerError')}`, {
              style: {
                backgroundColor: theme.palette.error.main,
                color: theme.palette.primary.contrastText,
              },
              duration: toastDismissTime,
            });
            break;
          default:
            break;
        }
      });
  } catch (error) {
    return error;
  }
};
