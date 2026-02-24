import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-case-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './case-detail.component.html',
  styleUrl: './case-detail.component.css',
})
export class CaseDetailComponent implements OnInit {
  ticket: Ticket | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    this.ticketService.getTicketById(id).subscribe({
      next: data => {
        this.ticket = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
