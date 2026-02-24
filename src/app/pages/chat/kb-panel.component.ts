import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KbDocument } from '../../models/kb-document.model';

@Component({
  selector: 'app-kb-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kb-panel.component.html',
  styleUrl: './kb-panel.component.css',
})
export class KbPanelComponent {
  documents: KbDocument[] = [];
}
