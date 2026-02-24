import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type OverlayType = 'chat' | null;

export interface OverlayState {
  isOpen: boolean;
  type: OverlayType;
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private overlayStateSubject = new BehaviorSubject<OverlayState>({
    isOpen: false,
    type: null,
  });

  overlayState$ = this.overlayStateSubject.asObservable();

  openChat(): void {
    this.overlayStateSubject.next({
      isOpen: true,
      type: 'chat',
    });
  }

  close(): void {
    this.overlayStateSubject.next({
      isOpen: false,
      type: null,
    });
  }
}
