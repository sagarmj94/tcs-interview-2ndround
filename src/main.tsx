import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { queryClient } from './api/queryClient';
import { theme } from './utils/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
