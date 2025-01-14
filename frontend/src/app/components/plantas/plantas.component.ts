import { Component, SimpleChanges } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { PlantaService } from '../../services/plantas/plantas.service';
import { Planta } from './planta';
import { ModalService } from '../../services/modal/modal.service';
import { EstadisticasDTO } from './estadisticasDTO';

@Component({
  selector: 'app-plantas',
  standalone: false,
  template: `
    <div class="container">
      <div class="row">
        <div
          class="mx-auto px-4 py-4 col"
          style="background-color: rgb(255, 255, 255); border-radius: 10px"
        >
          <div class="card">
            <div class="card-header">Lecturas OK</div>
            <div class="card-body m-0">
              <p>
                <b> {{ estadisticas.cantLecturasOK }}</b>
              </p>
            </div>
          </div>
        </div>

        <div
          class="mx-auto px-4 py-4 col"
          style="background-color: rgb(255, 255, 255); border-radius: 10px"
        >
          <div class="card">
            <div class="card-header">Alertas medias</div>
            <div class="card-body m-0">
              <p>
                <b> {{ estadisticas.cantAlertasMedias }}</b>
              </p>
            </div>
          </div>
        </div>

        <div
          class="mx-auto px-4 py-4 col"
          style="background-color: rgb(255, 255, 255); border-radius: 10px"
        >
          <div class="card">
            <div class="card-header">Lecturas OK</div>
            <div class="card-body m-0">
              <p>
                <b> {{ estadisticas.cantAlertasRojas }}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mx-auto px-4 py-4"
      style="background-color: rgb(255, 255, 255); border-radius: 10px"
    >
      <h2 class="mb-0">
        Plantas&nbsp;
        <a routerLink="/plantas/new" class="btn btn-success float-right"
          >Nueva</a
        >
        <div
          *ngIf="errorMessage"
          class="alert alert-danger alert-dismissible fade show"
        >
          {{ errorMessage }}
        </div>
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>Pais</th>
                <th>Nombre de la Planta</th>
                <th>Lecturas OK</th>
                <th>Alertas Medias</th>
                <th>Alertas Rojas</th>
                <th>Accion</th>
                <th>Accion 2</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let planta of plantas; index as i">
                <td>{{ planta.pais.nombre }}</td>
                <td>{{ planta.nombre }}</td>
                <td>{{ planta.cantLecturasOK }}</td>
                <td>{{ planta.cantAlertasMedias }}</td>
                <td>{{ planta.cantAlertasRojas }}</td>
                <td>
                  <a href="/plantas/{{ planta.id }}">
                    <i class="fa fa-pencil mx-2"></i>
                  </a>
                  &nbsp;
                </td>
                <td>
                  <button (click)="remove(planta.id)" class="btn btn-default">
                    <i class="fa fa-trash-o text-danger mx-2 "></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </h2>
    </div>
  `,
  styles: [],
})
export class PlantasComponent {
  errorMessage: string | undefined;
  plantas: Planta[] = [];

  estadisticas!: EstadisticasDTO;

  constructor(
    private plantaService: PlantaService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getPlantas();
    this.getEstadisticas();
  }

  getPlantas(): void {
    this.plantaService.all().subscribe((dataPackage) => {
      this.plantas = <Planta[]>dataPackage.data;
      console.log('Plantas obtenidas: ', this.plantas);
    });
  }

  getEstadisticas(): void {
    this.plantaService.getEstadisticas().subscribe((dataPackage) => {
      this.estadisticas = <EstadisticasDTO>dataPackage.data;
      console.log('Estadisticas obtenidas: ', this.estadisticas);
    });
  }

  remove(id: number): void {
    let that = this;
    this.modalService
      .confirm(
        'Eliminar Planta',
        '¿Está seguro de que desea eliminar la Planta?',
        'Si elimina la Planta no la podrá recuperar luego'
      )
      .then(function () {
        that.plantaService.remove(id).subscribe((dataPackage) => {
          that.getPlantas();
          if (dataPackage.status === 406) {
            that.modalService.error(
              'Eliminar Persona',
              dataPackage.message,
              ''
            );
          }
        });
      });
  }
}
