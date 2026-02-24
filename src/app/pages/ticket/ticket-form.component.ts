import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css',
})
export class TicketFormComponent {
  message = '';
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    subject: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['Medium', Validators.required],
    severity: ['2', Validators.required],
    status: ['Open', Validators.required],
    statusReason: ['Nuovo', Validators.required],
    origin: ['Web', Validators.required],
    customer: ['acc-1', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    product: ['', Validators.required]
  });

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;

    this.ticketService.createTicket(this.form.getRawValue()).subscribe(() => {
      this.message = 'Ticket creato con successo.';
      setTimeout(() => this.router.navigate(['/cases']), 600);
    });
  }
}
