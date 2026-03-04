import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly api = environment.apiUrl;
  private readonly http = inject(HttpClient);

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.api}/tickets`);
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.api}/tickets/${id}`);
  }

  createTicket(payload: Omit<Ticket, 'id' | 'numberId' | 'createdOn'>): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.api}/tickets`, payload);
  }

  updateTicket(id: string, payload: Partial<Ticket>): Observable<Ticket> {
    return this.http.patch<Ticket>(`${this.api}/tickets/${id}`, payload);
  }
}