import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { InvoiceStatusChip } from '../InvoiceStatusChip';

describe('InvoiceStatusChip', () => {
  test('renders status label', () => {
    render(<InvoiceStatusChip status="Draft" />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });
});

