import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { INVOICE_STATUSES, type InvoiceStatus } from '../../constants/invoice';
import { RHFTextField } from '../forms/RHFTextField';
import { allowedNextStatuses } from '../../utils/invoice';

export type InvoiceFormValues = {
  customerName: string;
  amount: number;
  status: InvoiceStatus;
};

const schema: yup.ObjectSchema<InvoiceFormValues> = yup.object({
  customerName: yup.string().trim().required('Customer name is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .moreThan(0, 'Amount must be greater than 0')
    .required('Amount is required'),
  status: yup.mixed<InvoiceStatus>().oneOf(INVOICE_STATUSES).required(),
});

type Props = {
  title: string;
  submitLabel: string;
  initialValues: InvoiceFormValues;
  loading?: boolean;
  statusLockedToTransitionsFrom?: InvoiceStatus;
  onSubmit: (values: InvoiceFormValues) => Promise<void> | void;
};

export function InvoiceForm({
  title,
  submitLabel,
  initialValues,
  loading,
  statusLockedToTransitionsFrom,
  onSubmit,
}: Props) {
  const { control, handleSubmit, watch } = useForm<InvoiceFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const currentStatus = watch('status');
  const allowedStatuses = statusLockedToTransitionsFrom
    ? allowedNextStatuses(statusLockedToTransitionsFrom)
    : allowedNextStatuses(currentStatus);

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit((v) => onSubmit(v))}>
      <Typography variant="h6" fontWeight={800}>
        {title}
      </Typography>

      <RHFTextField control={control} name="customerName" label="Customer Name" fullWidth />
      <RHFTextField control={control} name="amount" label="Amount" type="number" fullWidth inputProps={{ step: '0.01' }} />

      <Controller
        control={control}
        name="status"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Status"
            fullWidth
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            disabled={Boolean(statusLockedToTransitionsFrom) && statusLockedToTransitionsFrom === 'Paid'}
          >
            {INVOICE_STATUSES.map((s) => (
              <MenuItem key={s} value={s} disabled={!allowedStatuses.includes(s)}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Button type="submit" disabled={Boolean(loading)} size="large">
        {loading ? <CircularProgress size={22} /> : submitLabel}
      </Button>
    </Stack>
  );
}

