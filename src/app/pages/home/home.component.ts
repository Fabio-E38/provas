import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OverlayService } from '../../services/overlay.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private overlayService: OverlayService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openChat(): void {
    this.overlayService.openChat();
  }
}
