import { Card, CardContent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { InvoiceForm, type InvoiceFormValues } from '../components/invoices/InvoiceForm';
import { ROUTES } from '../constants/routes';
import { useCreateInvoice } from '../hooks/useInvoices';
import { useNotify } from '../hooks/useNotify';
import { getErrorMessage } from '../utils/error';

export function InvoiceCreatePage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const createMutation = useCreateInvoice();

  const initial: InvoiceFormValues = { customerName: '', amount: 0, status: 'Draft' };

  return (
    <Stack spacing={2}>
      <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <InvoiceForm
            title="Create invoice"
            submitLabel="Create"
            initialValues={initial}
            loading={createMutation.isPending}
            onSubmit={async (values) => {
              try {
                await createMutation.mutateAsync({
                  customerName: values.customerName,
                  amount: values.amount,
                });
                notify.success('Invoice created');
                navigate(ROUTES.invoices);
              } catch (e) {
                notify.error(getErrorMessage(e));
              }
            }}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}

