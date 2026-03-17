import { allowedNextStatuses, sortInvoices } from '../invoice';
import type { Invoice } from '../../types/invoice';

describe('invoice utils', () => {
  test('allowedNextStatuses enforces transitions', () => {
    expect(allowedNextStatuses('Draft')).toEqual(['Draft', 'Sent']);
    expect(allowedNextStatuses('Sent')).toEqual(['Sent', 'Paid']);
    expect(allowedNextStatuses('Paid')).toEqual(['Paid']);
  });

  test('sortInvoices sorts by status then createdAt desc', () => {
    const items: Invoice[] = [
      {
        id: '1',
        invoiceNumber: 'INV-1',
        customerName: 'A',
        amount: 1,
        status: 'Sent',
        createdAt: '2026-03-01T10:00:00.000Z',
      },
      {
        id: '2',
        invoiceNumber: 'INV-2',
        customerName: 'B',
        amount: 1,
        status: 'Draft',
        createdAt: '2026-03-02T10:00:00.000Z',
      },
      {
        id: '3',
        invoiceNumber: 'INV-3',
        customerName: 'C',
        amount: 1,
        status: 'Draft',
        createdAt: '2026-03-03T10:00:00.000Z',
      },
    ];

    const sorted = sortInvoices(items);
    expect(sorted.map((i) => i.id)).toEqual(['3', '2', '1']);
  });
});

