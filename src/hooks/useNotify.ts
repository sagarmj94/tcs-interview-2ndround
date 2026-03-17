import { useSnackbar } from 'notistack';

type NotifyOptions = {
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
};

export function useNotify() {
  const { enqueueSnackbar } = useSnackbar();

  return {
    success: (message: string, options?: Omit<NotifyOptions, 'variant'>) =>
      enqueueSnackbar(message, { ...options, variant: 'success' }),
    error: (message: string, options?: Omit<NotifyOptions, 'variant'>) =>
      enqueueSnackbar(message, { ...options, variant: 'error' }),
    info: (message: string, options?: Omit<NotifyOptions, 'variant'>) =>
      enqueueSnackbar(message, { ...options, variant: 'info' }),
    warning: (message: string, options?: Omit<NotifyOptions, 'variant'>) =>
      enqueueSnackbar(message, { ...options, variant: 'warning' }),
  };
}

