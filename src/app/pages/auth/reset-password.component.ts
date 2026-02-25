import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  token: string | null = null;
  isLoading = false;
  submitted = false;
  showPassword = false;
  showConfirm = false;
  currentYear = new Date().getFullYear();

  form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordsMatch }
  );

  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
  get hasMismatch() { return this.form.hasError('mismatch') && this.confirmPassword?.touched; }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.token) return;

    this.isLoading = true;
    this.authService.resetPassword(this.token, this.form.getRawValue().password).subscribe({
      next: () => {
        this.isLoading = false;
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
