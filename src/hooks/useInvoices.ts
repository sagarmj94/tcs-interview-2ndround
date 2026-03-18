import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiCreateInvoice, apiDeleteInvoice, apiGetInvoice, apiListInvoices, apiUpdateInvoice } from '../api/invoices';
import type { CreateInvoiceRequest, InvoiceListParams, InvoiceListResponse, UpdateInvoiceRequest } from '../types/invoice';
import { authStore } from '../store/authStore';
import { hasPermission } from '../utils/rbac';

export function useInvoiceList(params: InvoiceListParams) {
  return useQuery<InvoiceListResponse>({
    queryKey: ['invoices', 'list', params],
    queryFn: () => apiListInvoices(params),
    placeholderData: keepPreviousData,
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: ['invoices', 'detail', id],
    queryFn: () => apiGetInvoice(id),
    enabled: Boolean(id),
  });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateInvoiceRequest) => {
      const user = authStore.getState().user;
      if (!user || !hasPermission(user.role, 'invoice:create')) {
        throw new Error('Forbidden');
      }
      return apiCreateInvoice(payload);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['invoices', 'list'] });
    },
  });
}

export function useUpdateInvoice(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateInvoiceRequest) => {
      const user = authStore.getState().user;
      if (!user || !hasPermission(user.role, 'invoice:update')) {
        throw new Error('Forbidden');
      }
      return apiUpdateInvoice(id, payload);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['invoices', 'list'] });
      await qc.invalidateQueries({ queryKey: ['invoices', 'detail', id] });
    },
  });
}

export function useDeleteInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const user = authStore.getState().user;
      if (!user || !hasPermission(user.role, 'invoice:delete')) {
        throw new Error('Forbidden');
      }
      return apiDeleteInvoice(id);
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['invoices', 'list'] });
    },
  });
}

