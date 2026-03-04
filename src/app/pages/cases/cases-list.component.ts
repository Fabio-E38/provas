import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AppShellComponent],
  templateUrl: './cases-list.component.html',
  styleUrl: './cases-list.component.css',
})
export class CasesListComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  searchQuery = '';
  activeFilter = 'all';

  private ticketService = inject(TicketService);

  get filtered(): Ticket[] {
    let list = this.activeFilter === 'all'
      ? this.tickets
      : this.tickets.filter(t => t.status.toLowerCase().replace(' ', '-') === this.activeFilter);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.numberId.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q)
      );
    }
    return list;
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: data => { this.tickets = data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  priorityClass(p: string): string {
    switch (p.toLowerCase()) {
      case 'critical': return 'b-crit';
      case 'high':     return 'b-high';
      case 'medium':   return 'b-med';
      default:         return 'b-low';
    }
  }

  statusClass(s: string): string {
    switch (s.toLowerCase().replace(' ', '-')) {
      case 'open':        return 'b-open';
      case 'in-progress': return 'b-prog';
      case 'resolved':    return 'b-done';
      case 'closed':      return 'b-closed';
      default:            return 'b-open';
    }
  }
}

