import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, AppShellComponent],
  templateUrl: './case-detail.component.html',
  styleUrl: './case-detail.component.css',
})
export class CaseDetailComponent implements OnInit {
  ticket: Ticket | undefined;
  loading = true;

  private route = inject(ActivatedRoute);
  private ticketService = inject(TicketService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.loading = false; return; }
    this.ticketService.getTicketById(id).subscribe({
      next: data => { this.ticket = data; this.loading = false; },
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

