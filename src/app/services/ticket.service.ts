import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { MOCK_TICKETS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: Ticket[] = [...MOCK_TICKETS];

  getTickets(): Observable<Ticket[]> {
    return of(this.tickets);
  }

  getTicketById(id: string): Observable<Ticket | undefined> {
    return of(this.tickets.find(ticket => ticket.id === id));
  }

  createTicket(payload: Omit<Ticket, 'id' | 'numberId' | 'createdOn'>): Observable<Ticket> {
    const newTicket: Ticket = {
      ...payload,
      id: `t${this.tickets.length + 1}`,
      numberId: `TK-2026-${String(this.tickets.length + 1).padStart(3, '0')}`,
      createdOn: new Date()
    };

    this.tickets = [newTicket, ...this.tickets];
    return of(newTicket);
  }

  updateTicket(id: string, payload: Partial<Ticket>): Observable<Ticket | undefined> {
    const index = this.tickets.findIndex(ticket => ticket.id === id);
    if (index === -1) return of(undefined);

    this.tickets[index] = { ...this.tickets[index], ...payload };
    return of(this.tickets[index]);
  }
}