import { Location, UpperCasePipe } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Planta } from '../plantas/planta';
import { PlantaService } from '../../services/plantas/plantas.service';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-planta-detail',
  standalone: false,
  template: `
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <div class="modal-header" *ngIf="planta">
        <h2 class="modal-title" id="modal-title">Nueva Planta:</h2>
        <form #form="ngForm">
          <div class="container modal-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="pais">Pais:</label>
                  <input
                    [(ngModel)]="planta.pais.nombre"
                    class="form-control"
                    placeholder="Pais"
                    required
                    name="pais"
                  />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input
                    [(ngModel)]="planta.nombre"
                    name="nombre"
                    placeholder="Nombre"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="dni">Cantidad de lecturas</label>
                    <input
                      [(ngModel)]="planta.cantLecturasOK"
                      name="cantLecturasOK"
                      placeholder="Cantidad de Lecturas OK"
                      class="form-control"
                      (keydown)="validarNumeros($event)"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="cuit">Alertas Medias</label>
                    <input
                      [(ngModel)]="planta.cantAlertasMedias"
                      name="cantAlertasMedias"
                      placeholder="Cantidad de Alertas Medias"
                      class="form-control"
                      (keydown)="validarNumeros($event)"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="cuit">Alertas Rojas</label>
                    <input
                      [(ngModel)]="planta.cantAlertasRojas"
                      name="cantAlertasRojas"
                      placeholder="Cantidad de Alertas Rojas"
                      class="form-control"
                      (keydown)="validarNumeros($event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button (click)="goBack()" class="btn btn-danger">Atrás</button>
            &nbsp;

            <button
              (click)="save()"
              [disabled]="form.invalid || plantaExiste"
              class="btn btn-success"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class ModalPlantaDetailComponent {
  planta!: Planta;
  plantaExiste: Planta | undefined;
  mensaje!: { texto: string; tipo: string };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private plantaService: PlantaService,
    private modalService: ModalService
  ) {}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let that = this;
    this.plantaService.save(this.planta).subscribe((dataPackage) => {
      this.planta = <Planta>dataPackage.data;
      if (dataPackage.status == 200) {
        that.modalService.success(
          'Notificación',
          'Detalles sobre Persona',
          dataPackage.message
        );
      }
      if (dataPackage.status != 200) {
        that.modalService.error(
          'Notificación',
          'Detalles sobre Persona',
          dataPackage.message
        );
      } else {
        this.goBack();
      }
    });
  }

  validarNumeros(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
    ];
    if (
      allowedKeys.includes(event.key) ||
      // Permitir números del teclado numérico y las teclas de flecha
      (event.key >= '0' && event.key <= '9') ||
      (event.key >= 'Numpad0' && event.key <= 'Numpad9')
    ) {
      return;
    }
    event.preventDefault();
  }
}
