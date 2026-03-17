import type { Invoice } from '../types/invoice';
import { INVOICE_STATUS_ORDER } from '../constants/invoice';

export function sortInvoices(invoices: readonly Invoice[]): Invoice[] {
  return [...invoices].sort((a, b) => {
    const statusDiff = INVOICE_STATUS_ORDER[a.status] - INVOICE_STATUS_ORDER[b.status];
    if (statusDiff !== 0) return statusDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function allowedNextStatuses(current: Invoice['status']): Invoice['status'][] {
  if (current === 'Draft') return ['Draft', 'Sent'];
  if (current === 'Sent') return ['Sent', 'Paid'];
  return ['Paid'];
}

