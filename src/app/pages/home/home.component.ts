import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OverlayService } from '../../services/overlay.service';
import { TicketService } from '../../services/ticket.service';
import { KbService } from '../../services/kb.service';
import { User } from '../../models/user.model';
import { Ticket } from '../../models/ticket.model';
import { KbDocument } from '../../models/kb-document.model';

export interface SlaItem {
  id: string;
  numberId: string;
  title: string;
  priority: string;
  timeLeft: string;
  timeClass: string;
  fillPercent: number;
  fillColor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  tickets: Ticket[] = [];
  kbDocuments: KbDocument[] = [];
  searchQuery = '';
  activeFilter = 'all';
  readonly todayLabel = new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

  get openCount():       number { return this.tickets.filter(t => t.status === 'Open').length; }
  get inProgressCount(): number { return this.tickets.filter(t => t.status === 'In Progress').length; }
  get resolvedCount():   number { return this.tickets.filter(t => t.status === 'Resolved').length; }
  get totalCount():      number { return this.tickets.length; }

  get recentTickets(): Ticket[] {
    const filtered = this.activeFilter === 'all'
      ? this.tickets
      : this.tickets.filter(t => t.status.toLowerCase().replace(' ', '-') === this.activeFilter);
    return filtered.slice(0, 8);
  }

  get firstName(): string {
    if (!this.currentUser?.name) return 'Benvenuto';
    return this.currentUser.name.split(' ')[0];
  }

  get userInitials(): string {
    if (!this.currentUser?.name) return 'U';
    return this.currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  get slaItems(): SlaItem[] {
    return this.tickets
      .filter(t => t.status === 'Open' || t.status === 'In Progress')
      .slice(0, 4)
      .map(t => {
        const isHigh = t.priority === 'High' || t.priority === 'Critical';
        const isMed  = t.priority === 'Medium';
        const fill   = isHigh ? 82 : isMed ? 45 : 18;
        const timeStr = isHigh ? '2h 30m' : isMed ? '8h 15m' : '24h 00m';
        const cls     = isHigh ? 'crit' : isMed ? 'warn' : 'ok';
        const color   = isHigh
          ? 'var(--crit-c)'
          : isMed
            ? 'var(--med-c)'
            : 'var(--low-c)';
        return { id: t.id, numberId: t.numberId, title: t.title, priority: t.priority, timeLeft: timeStr, timeClass: cls, fillPercent: fill, fillColor: color } as SlaItem;
      });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private overlayService: OverlayService,
    private ticketService: TicketService,
    private kbService: KbService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.ticketService.getTickets().subscribe(t => (this.tickets = t));
    this.kbService.suggestDocuments('').subscribe(docs => (this.kbDocuments = docs.slice(0, 3)));
  }

  setFilter(f: string): void { this.activeFilter = f; }

  setChip(text: string): void {
    this.searchQuery = text;
    this.overlayService.openChat();
  }

  onSearchSubmit(): void {
    if (this.searchQuery.trim()) this.overlayService.openChat();
  }

  priorityClass(priority: string): string {
    switch (priority.toLowerCase()) {
      case 'critical': return 'hp-b-crit';
      case 'high':     return 'hp-b-high';
      case 'medium':   return 'hp-b-med';
      default:         return 'hp-b-low';
    }
  }

  statusClass(status: string): string {
    switch (status.toLowerCase().replace(' ', '-')) {
      case 'open':        return 'hp-b-open';
      case 'in-progress': return 'hp-b-prog';
      case 'resolved':    return 'hp-b-done';
      case 'closed':      return 'hp-b-closed';
      default:            return 'hp-b-open';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openChat(): void {
    this.overlayService.openChat();
  }
}

