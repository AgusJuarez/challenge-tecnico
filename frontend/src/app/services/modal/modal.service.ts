import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalMessageErrorComponent } from '../../components/modal/modalMessageError.component';
import { ModalSuccessMessageComponent } from '../../components/modal/modalSuccessMessage.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  confirm(title: string, message: string, description: string): Promise<any> {
    const modal = this.modalService.open(ModalComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;
    modal.componentInstance.description = description;
    return modal.result;
  }

  error(title: string, message: string, description: string): Promise<any> {
    const modal = this.modalService.open(ModalMessageErrorComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;
    modal.componentInstance.description = description;
    return modal.result;
  }

  success(title: string, message: string, description: string): Promise<any> {
    const modal = this.modalService.open(ModalSuccessMessageComponent);
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;
    modal.componentInstance.description = description;
    return modal.result;
  }
}
