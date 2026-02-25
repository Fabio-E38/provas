import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isLoading = false;
  submitted = false;
  currentYear = new Date().getFullYear();

  get email() {
    return this.form.get('email');
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.authService.forgotPassword(this.form.getRawValue().email).subscribe({
      next: () => {
        this.isLoading = false;
        this.submitted = true;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
