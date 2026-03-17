export const INVOICE_STATUSES = ['Draft', 'Sent', 'Paid'] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const INVOICE_STATUS_ORDER: Record<InvoiceStatus, number> = {
  Draft: 0,
  Sent: 1,
  Paid: 2,
};

