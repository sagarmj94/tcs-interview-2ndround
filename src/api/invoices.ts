import { http } from './http';
import type { CreateInvoiceRequest, Invoice, InvoiceListParams, InvoiceListResponse, UpdateInvoiceRequest } from '../types/invoice';

export async function apiListInvoices(params: InvoiceListParams): Promise<InvoiceListResponse> {
  const res = await http.get<InvoiceListResponse>('/api/invoices', {
    params: {
      page: params.page,
      limit: params.limit,
      search: params.search ?? '',
      status: params.status ?? '',
    },
  });
  return res.data;
}

export async function apiGetInvoice(id: string): Promise<Invoice> {
  const res = await http.get<Invoice>(`/api/invoices/${id}`);
  return res.data;
}

export async function apiCreateInvoice(payload: CreateInvoiceRequest): Promise<Invoice> {
  const res = await http.post<Invoice>('/api/invoices', payload);
  return res.data;
}

export async function apiUpdateInvoice(id: string, payload: UpdateInvoiceRequest): Promise<Invoice> {
  const res = await http.patch<Invoice>(`/api/invoices/${id}`, payload);
  return res.data;
}

export async function apiDeleteInvoice(id: string): Promise<void> {
  await http.delete(`/api/invoices/${id}`);
}

