import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #6d28d9 0%, #5b21b6 55%, #4c1d95 100%)',
          color: 'common.white',
          p: 7,
        }}
      >
        {/* Decorative blobs */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 15% 25%, rgba(255,255,255,0.14), transparent 42%), radial-gradient(circle at 70% 15%, rgba(255,255,255,0.10), transparent 45%), radial-gradient(circle at 40% 70%, rgba(255,255,255,0.08), transparent 40%)',
          }}
        />

        <Stack spacing={3} sx={{ position: 'relative', maxWidth: 560, height: '100%' }} justifyContent="space-between">
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={800}>
              Accounting,
              <br />
              automated with Intelligence.
            </Typography>
            <Typography sx={{ opacity: 0.92, maxWidth: 520 }}>
              Transform your invoice workflow with secure authentication, role-based access control, and a clean
              dashboard—built with React, TypeScript, and MUI.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={5} sx={{ opacity: 0.95 }}>
            <Stack spacing={0.5}>
              <Typography variant="h6" fontWeight={800}>
                98%
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Time saved on
                <br />
                data entry
              </Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="h6" fontWeight={800}>
                500+
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Forms
                <br />
                transformed
              </Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="h6" fontWeight={800}>
                99.9%
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Accuracy
                <br />
                rate
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Container
        maxWidth="sm"
        sx={{
          bgcolor: '#f4f5fb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: { xs: 3, sm: 4 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(17, 24, 39, 0.08)',
          }}
        >
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}

