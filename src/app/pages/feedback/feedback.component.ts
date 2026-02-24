import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  message = '';
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comments: [''],
    source: ['Portal', Validators.required]
  });

  constructor(
    private feedbackService: FeedbackService
  ) {}

  onSubmit(): void {
    if (this.form.invalid) return;

    this.feedbackService.submitFeedback(this.form.getRawValue()).subscribe(() => {
      this.message = 'Feedback inviato con successo.';
      this.form.reset({ title: '', rating: 5, comments: '', source: 'Portal' });
    });
  }
}
