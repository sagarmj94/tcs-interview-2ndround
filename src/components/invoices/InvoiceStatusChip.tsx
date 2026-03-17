import { Chip } from '@mui/material';
import type { InvoiceStatus } from '../../constants/invoice';

const colorByStatus: Record<InvoiceStatus, 'default' | 'warning' | 'info' | 'success'> = {
  Draft: 'warning',
  Sent: 'info',
  Paid: 'success',
};

export function InvoiceStatusChip({ status }: { status: InvoiceStatus }) {
  return <Chip size="small" label={status} color={colorByStatus[status]} variant="outlined" />;
}

