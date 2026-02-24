import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cases-list.component.html',
  styleUrl: './cases-list.component.css',
})
export class CasesListComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe({
      next: data => {
        this.tickets = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
