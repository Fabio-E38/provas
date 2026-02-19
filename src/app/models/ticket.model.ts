export interface Ticket {
  id: string;
  numberId: string;
  title: string;
  subject: string;
  description: string;
  priority: string;
  severity: string;
  status: string;
  statusReason: string;
  origin: string;
  customer: string;
  email: string;
  product: string;
  createdOn: Date;
}