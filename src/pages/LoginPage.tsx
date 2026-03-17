import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Link, Stack, Typography, InputAdornment, IconButton, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useState } from 'react';
import { RHFTextField } from '../components/forms/RHFTextField';
import { EmailIcon, EyeIcon, EyeOffIcon, LockIcon } from '../components/icons/AuthIcons';
import { ROUTES } from '../constants/routes';
import { useLogin } from '../hooks/useAuth';
import { useNotify } from '../hooks/useNotify';
import { getErrorMessage } from '../utils/error';

type FormValues = {
  email: string;
  password: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const from = (location.state as { from?: string } | null)?.from ?? ROUTES.invoices;

  return (
    <Stack spacing={2.5}>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight={800}>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to your account to continue
        </Typography>
      </Stack>

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(async (values) => {
          try {
            await login.mutateAsync(values);
            notify.success('Logged in');
            navigate(from, { replace: true });
          } catch (e) {
            notify.error(getErrorMessage(e));
          }
        })}
      >
        <RHFTextField<FormValues>
          control={control}
          name="email"
          label="Email address"
          placeholder="you@company.com"
          type="email"
          autoComplete="email"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField<FormValues>
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide password' : 'show password'}
                  edge="end"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <EyeOffIcon fontSize="small" /> : <EyeIcon fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            component="button"
            type="button"
            underline="hover"
            variant="body2"
            onClick={() => notify.info('Password reset is not implemented in this frontend.')}
          >
            Forgot password?
          </Link>
        </Box>

        <Button type="submit" disabled={login.isPending} size="large">
          {login.isPending ? <CircularProgress size={22} /> : 'Sign in'}
        </Button>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} to={ROUTES.signup} underline="hover">
          Create one
        </Link>
      </Typography>
    </Stack>
  );
}

