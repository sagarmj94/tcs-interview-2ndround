import type { InvoiceStatus } from '../constants/invoice';

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: string; // ISO
};

export type InvoiceListResponse = {
  items: Invoice[];
  total: number;
  page: number;
  limit: number;
};

export type InvoiceListParams = {
  page: number;
  limit: number;
  search?: string;
  status?: InvoiceStatus | '';
};

export type CreateInvoiceRequest = {
  customerName: string;
  amount: number;
};

export type UpdateInvoiceRequest = Partial<{
  customerName: string;
  amount: number;
  status: InvoiceStatus;
}>;

