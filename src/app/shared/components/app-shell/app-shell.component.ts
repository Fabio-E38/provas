import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TicketService } from '../../../services/ticket.service';
import { User } from '../../../models/user.model';
import { Ticket } from '../../../models/ticket.model';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.css',
})
export class AppShellComponent implements OnInit {
  /** Shown in the topbar breadcrumb, e.g. "Lista Casi" */
  @Input() pageTitle = '';
  /** Optional section label shown before the page title, e.g. "Ticket" */
  @Input() section = 'TicketPro';

  private authService = inject(AuthService);
  private ticketService = inject(TicketService);
  private router = inject(Router);

  currentUser: User | null = null;
  private tickets: Ticket[] = [];

  get openCount(): number  { return this.tickets.filter(t => t.status === 'Open').length; }
  get totalCount(): number { return this.tickets.length; }

  get userInitials(): string {
    if (!this.currentUser?.name) return 'U';
    return this.currentUser.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.ticketService.getTickets().subscribe({ next: data => (this.tickets = data) });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
