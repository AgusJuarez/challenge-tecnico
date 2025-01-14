import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: false,
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">{{ title }}</h4>
    </div>
    <div class="modal-body">
      <p>
        <strong>{{ message }}</strong>
      </p>
      <p *ngIf="description">
        <strong>{{ description }}</strong>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss()"
      >
        Cancelar
      </button>
      <button type="button" class="btn btn-success" (click)="modal.close()">
        Aceptar
      </button>
    </div>
  `,
  styles: ``,
})
export class ModalComponent {
  constructor(public modal: NgbActiveModal) {}

  title = '';
  message = '';
  description = '';
}
