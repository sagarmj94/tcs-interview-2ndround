export const ROUTES = {
  login: '/login',
  signup: '/signup',
  app: '/',
  invoices: '/invoices',
  invoiceNew: '/invoices/new',
  invoiceEdit: (id: string) => `/invoices/${id}/edit`,
} as const;

