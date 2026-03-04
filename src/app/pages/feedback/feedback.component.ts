import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { AppShellComponent } from '../../shared/components/app-shell/app-shell.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AppShellComponent],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  message = '';
  hoverRating = 0;
  private fb = inject(FormBuilder);
  private feedbackService = inject(FeedbackService);

  form = this.fb.nonNullable.group({
    title:    ['', Validators.required],
    rating:   [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    comments: [''],
    source:   ['Portal', Validators.required],
  });

  get currentRating(): number { return this.form.controls.rating.value; }

  setRating(n: number): void { this.form.controls.rating.setValue(n); }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.feedbackService.submitFeedback(this.form.getRawValue()).subscribe(() => {
      this.message = 'Feedback inviato con successo. Grazie!';
      this.form.reset({ title: '', rating: 5, comments: '', source: 'Portal' });
    });
  }
}

