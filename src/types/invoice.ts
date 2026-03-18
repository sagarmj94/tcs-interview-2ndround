import type { InvoiceStatus } from '../constants/invoice';

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  status: InvoiceStatus;
  // Backend returns epoch milliseconds; Date ctor handles number or string.
  createdAt: number;
};

export type InvoiceListResponse = {
  items: Invoice[];
  totalCount: number;
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

