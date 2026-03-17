import { Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InvoiceForm, type InvoiceFormValues } from '../components/invoices/InvoiceForm';
import { ROUTES } from '../constants/routes';
import { useInvoice, useUpdateInvoice } from '../hooks/useInvoices';
import { useNotify } from '../hooks/useNotify';
import { getErrorMessage } from '../utils/error';

export function InvoiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const invoiceId = id ?? '';
  const navigate = useNavigate();
  const notify = useNotify();

  const invoiceQuery = useInvoice(invoiceId);
  const updateMutation = useUpdateInvoice(invoiceId);

  const initial = useMemo<InvoiceFormValues | null>(() => {
    const inv = invoiceQuery.data;
    if (!inv) return null;
    return {
      customerName: inv.customerName,
      amount: inv.amount,
      status: inv.status,
    };
  }, [invoiceQuery.data]);

  if (invoiceQuery.isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 280 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (invoiceQuery.isError || !initial || !invoiceQuery.data) {
    return (
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight={800}>
          Invoice not found
        </Typography>
        <Typography color="text.secondary">Please go back to the invoices list.</Typography>
      </Stack>
    );
  }

  return (
    <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <InvoiceForm
          title={`Edit invoice ${invoiceQuery.data.invoiceNumber}`}
          submitLabel="Save changes"
          initialValues={initial}
          statusLockedToTransitionsFrom={invoiceQuery.data.status}
          loading={updateMutation.isPending}
          onSubmit={async (values) => {
            try {
              await updateMutation.mutateAsync({
                customerName: values.customerName,
                amount: values.amount,
                status: values.status,
              });
              notify.success('Invoice updated');
              navigate(ROUTES.invoices);
            } catch (e) {
              notify.error(getErrorMessage(e));
            }
          }}
        />
      </CardContent>
    </Card>
  );
}

