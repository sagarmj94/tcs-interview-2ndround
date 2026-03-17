import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, Link, Stack, Typography, InputAdornment, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useState } from 'react';
import { RHFTextField } from '../components/forms/RHFTextField';
import { EmailIcon, EyeIcon, EyeOffIcon, LockIcon } from '../components/icons/AuthIcons';
import { ROUTES } from '../constants/routes';
import { useNotify } from '../hooks/useNotify';
import { useSignup } from '../hooks/useAuth';
import { getErrorMessage } from '../utils/error';

type FormValues = {
  email: string;
  password: string;
};

const schema: yup.ObjectSchema<FormValues> = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export function SignupPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const signup = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  return (
    <Stack spacing={2.5}>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight={800}>
          Create your account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign up to start managing invoices
        </Typography>
      </Stack>

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(async (values) => {
          try {
            await signup.mutateAsync(values);
            notify.success('Account created');
            navigate(ROUTES.invoices, { replace: true });
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
          autoComplete="new-password"
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

        <Button type="submit" disabled={signup.isPending} size="large">
          {signup.isPending ? <CircularProgress size={22} /> : 'Sign up'}
        </Button>
      </Stack>

      <Typography variant="body2" color="text.secondary">
        Already have an account?{' '}
        <Link component={RouterLink} to={ROUTES.login} underline="hover">
          Sign in
        </Link>
      </Typography>
    </Stack>
  );
}

