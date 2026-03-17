import { useMemo, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { INVOICE_STATUSES } from '../constants/invoice';
import { useInvoiceList, useDeleteInvoice } from '../hooks/useInvoices';
import { useNotify } from '../hooks/useNotify';
import { getErrorMessage } from '../utils/error';
import { sortInvoices } from '../utils/invoice';
import { InvoiceStatusChip } from '../components/invoices/InvoiceStatusChip';
import { authStore } from '../store/authStore';
import { hasPermission } from '../utils/rbac';
import type { Invoice } from '../types/invoice';

export function InvoiceListPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const user = authStore((s) => s.user);

  const [page, setPage] = useState(0); // DataGrid is 0-based
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const listQuery = useInvoiceList({
    page: page + 1,
    limit: pageSize,
    search,
    status: status as '' | (typeof INVOICE_STATUSES)[number],
  });

  const deleteMutation = useDeleteInvoice();

  const canCreate = user ? hasPermission(user.role, 'invoice:create') : false;
  const canUpdate = user ? hasPermission(user.role, 'invoice:update') : false;
  const canDelete = user ? hasPermission(user.role, 'invoice:delete') : false;

  const rows = useMemo(() => {
    const items = listQuery.data?.items ?? [];
    return sortInvoices(items);
  }, [listQuery.data]);

  const columns = useMemo<GridColDef<Invoice>[]>(
    () => [
      { field: 'invoiceNumber', headerName: 'Invoice Number', flex: 1, minWidth: 150 },
      { field: 'customerName', headerName: 'Customer Name', flex: 1.2, minWidth: 180 },
      {
        field: 'amount',
        headerName: 'Amount',
        flex: 0.8,
        minWidth: 120,
        valueFormatter: (v) => `$${Number(v).toFixed(2)}`,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 0.7,
        minWidth: 120,
        renderCell: (params) => <InvoiceStatusChip status={params.row.status} />,
        sortable: false,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1,
        minWidth: 180,
        valueFormatter: (v) => new Date(String(v)).toLocaleString(),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        minWidth: 220,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            {canUpdate ? (
              <Button size="small" variant="outlined" onClick={() => navigate(ROUTES.invoiceEdit(params.row.id))}>
                Edit
              </Button>
            ) : null}
            {canDelete ? (
              <Button
                size="small"
                color="error"
                variant="outlined"
                disabled={deleteMutation.isPending}
                onClick={async () => {
                  try {
                    await deleteMutation.mutateAsync(params.row.id);
                    notify.success('Invoice deleted');
                  } catch (e) {
                    notify.error(getErrorMessage(e));
                  }
                }}
              >
                Delete
              </Button>
            ) : null}
          </Stack>
        ),
      },
    ],
    [canDelete, canUpdate, deleteMutation, navigate, notify]
  );

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }} justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Invoices
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search, filter, and manage invoices.
          </Typography>
        </Box>

        {canCreate ? (
          <Button onClick={() => navigate(ROUTES.invoiceNew)}>Create Invoice</Button>
        ) : null}
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <TextField
          label="Search customer"
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
          fullWidth
        />
        <TextField
          label="Status"
          select
          value={status}
          onChange={(e) => {
            setPage(0);
            setStatus(e.target.value);
          }}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All</MenuItem>
          {INVOICE_STATUSES.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Box sx={{ height: 560, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.id}
          loading={listQuery.isLoading}
          rowCount={listQuery.data?.total ?? 0}
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(m) => {
            setPage(m.page);
            setPageSize(m.pageSize);
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20, 50]}
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
          slotProps={{
            noRowsOverlay: {
              children: (
                <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                  <Typography color="text.secondary">No invoices found</Typography>
                </Stack>
              ),
            },
          }}
        />
      </Box>
    </Stack>
  );
}

