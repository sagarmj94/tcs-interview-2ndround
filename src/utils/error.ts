import type { AxiosError } from 'axios';

type ApiErrorShape = {
  message?: string;
  error?: string;
};

export function getErrorMessage(error: unknown): string {
  if (!error) return 'Something went wrong';

  if (typeof error === 'string') return error;

  const maybeAxios = error as AxiosError<ApiErrorShape>;
  const apiMsg = maybeAxios.response?.data?.message ?? maybeAxios.response?.data?.error;
  if (apiMsg) return apiMsg;

  if (maybeAxios.message) return maybeAxios.message;

  return 'Something went wrong';
}

