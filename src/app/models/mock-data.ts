import { Ticket } from './ticket.model';
import { Feedback } from './feedback.model';

export interface AccountMock {
  id: string;
  accountName: string;
  mainPhone: string;
  email: string;
  addressCity: string;
  website: string;
  primaryContact: string;
  codiceFiscale?: string;
}

export interface ContactMock {
  id: string;
  name: string;
  email: string;
  businessPhone: string;
  companyName: string;
  jobTitle: string;
}

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 't1',
    numberId: 'TK-2026-001',
    title: 'Errore login portale',
    subject: 'Accesso',
    description: 'Utente non riesce ad accedere con credenziali corrette.',
    priority: 'High',
    severity: '2',
    status: 'Open',
    statusReason: 'In lavorazione',
    origin: 'Web',
    customer: 'acc-1',
    email: 'mario.rossi@azienda.it',
    product: 'Portale Ticketing',
    createdOn: new Date('2026-02-20T10:00:00')
  },
  {
    id: 't2',
    numberId: 'TK-2026-002',
    title: 'Lentezza caricamento dashboard',
    subject: 'Performance',
    description: 'La dashboard impiega oltre 10 secondi per caricarsi.',
    priority: 'Medium',
    severity: '3',
    status: 'Open',
    statusReason: 'Nuovo',
    origin: 'Email',
    customer: 'acc-2',
    email: 'laura.bianchi@contoso.com',
    product: 'Dashboard',
    createdOn: new Date('2026-02-21T09:30:00')
  }
];

export const MOCK_ACCOUNTS: AccountMock[] = [
  {
    id: 'acc-1',
    accountName: 'Azienda Rossi SRL',
    mainPhone: '+39 02 1234567',
    email: 'info@azienda-rossi.it',
    addressCity: 'Milano',
    website: 'https://azienda-rossi.it',
    primaryContact: 'con-1',
    codiceFiscale: 'RSSMRA90A01F205X'
  },
  {
    id: 'acc-2',
    accountName: 'Contoso SPA',
    mainPhone: '+39 06 7654321',
    email: 'support@contoso.com',
    addressCity: 'Roma',
    website: 'https://contoso.com',
    primaryContact: 'con-2'
  }
];

export const MOCK_CONTACTS: ContactMock[] = [
  {
    id: 'con-1',
    name: 'Mario Rossi',
    email: 'mario.rossi@azienda.it',
    businessPhone: '+39 02 1234567',
    companyName: 'Azienda Rossi SRL',
    jobTitle: 'IT Manager'
  },
  {
    id: 'con-2',
    name: 'Laura Bianchi',
    email: 'laura.bianchi@contoso.com',
    businessPhone: '+39 06 7654321',
    companyName: 'Contoso SPA',
    jobTitle: 'Service Owner'
  }
];

export const MOCK_FEEDBACKS: Feedback[] = [];