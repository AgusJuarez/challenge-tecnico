import { Location, UpperCasePipe } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Planta } from '../plantas/planta';
import { PlantaService } from '../../services/plantas/plantas.service';
import { ModalService } from '../../services/modal/modal.service';
import { LoginService } from '../../services/auth/login.service';
import { Pais } from './pais';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { PaisService } from '../../services/pais/pais.service';

@Component({
  selector: 'app-planta-detail',
  standalone: false,
  template: `
    <!--<p *ngIf="errorMessage.length != 0" class="text-danger">{{ errorMessage }}</p> -->
    <div *ngIf="(userLoginOn && !editMode) || !userLoginOn">
      <p><b> Planta: </b> {{ planta.pais.nombre }}</p>
      <p><b> Nombre: </b> {{ planta.nombre }}</p>
      <p><b> Cantidad de Lecturas OK: </b> {{ planta.cantLecturasOK }}</p>
      <p><b> Cantidad de Alertas Medias: </b> {{ planta.cantAlertasMedias }}</p>
      <p><b> Cantidad de Alertas Rojas: </b> {{ planta.cantAlertasRojas }}</p>
      <button
        *ngIf="userLoginOn && !editMode"
        (click)="editMode = true"
        class="btn btn-dark"
      >
        <img
          src="https://cdn.icon-icons.com/icons2/1572/PNG/96/3592815-compose-create-edit-edit-file-office-pencil-writing_107734.png"
          width="8%"
          alt="editar"
        />Editar Datos
      </button>
    </div>

    <form
      #form="ngForm"
      *ngIf="userLoginOn && editMode"
      [formGroup]="registerForm"
    >
      <div class="form-group row">
        <label for="inputPais" class="col-sm-1 col-form-label">Pais</label>
        <div class="col-sm-11">
          <input
            type="text"
            formControlName="pais"
            class="form-control"
            id="inputPais"
            required
          />
          <div
            *ngIf="
              registerForm.get('pais')?.invalid &&
              (registerForm.get('pais')?.dirty ||
                registerForm.get('pais')?.touched)
            "
            class="text-danger"
          >
            <div *ngIf="registerForm.get('pais')?.errors?.['required']">
              El Pais es requerido.
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputName" class="col-sm-1 col-form-label">Nombre</label>
        <div class="col-sm-11">
          <input
            type="text"
            formControlName="nombre"
            class="form-control"
            id="inputName"
          />
          <div
            *ngIf="
              registerForm.get('nombre')?.invalid &&
              (registerForm.get('nombre')?.dirty ||
                registerForm.get('nombre')?.touched)
            "
            class="text-danger"
          >
            <div *ngIf="registerForm.get('nombre')?.errors?.['required']">
              El Nombre es requerido.
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row border-bottom pb-3">
        <label for="inputCountry" class="col-sm-1 col-form-label"
          >Alertas OK</label
        >
        <div class="col-sm-11">
          <input
            type="number"
            formControlName="cantLecturasOK"
            class="form-control"
            id="inputLecturasOK"
          />
        </div>
      </div>
      <div class="form-group row border-bottom pb-3">
        <label for="inputCountry" class="col-sm-1 col-form-label"
          >Alertas Medias</label
        >
        <div class="col-sm-11">
          <input
            type="number"
            formControlName="cantAlertasMedias"
            class="form-control"
            id="inputAlertasMedias"
          />
        </div>
      </div>
      <div class="form-group row border-bottom pb-3">
        <label for="inputCountry" class="col-sm-1 col-form-label"
          >Alertas Rojas</label
        >
        <div class="col-sm-11">
          <input
            type="number"
            formControlName="cantAlertasRojas"
            class="form-control"
            id="inputAlertasRojas"
          />
        </div>
      </div>
      <button
        type="submit"
        (click)="savePlantaDetailsData()"
        class="btn btn-dark mt-3"
      >
        Guardar
      </button>

      <button (click)="goBack()" class="btn btn-danger mt-3">Cancelar</button>
    </form>
  `,
  styles: [],
})
export class PlantaDetail {
  private formBuilder: FormBuilder = new FormBuilder();
  errorMessage: String = '';
  planta!: Planta;
  userLoginOn: boolean = true;
  editMode: boolean = true;
  searching: boolean = false;
  searchFailed: boolean = false;

  registerForm = this.formBuilder.group({
    id: [0],
    pais: ['', Validators.required],
    nombre: ['', Validators.required],
    cantLecturasOK: [0],
    cantAlertasMedias: [0],
    cantAlertasRojas: [0],
  });

  constructor(
    private plantaService: PlantaService,
    private loginService: LoginService,
    private paisService: PaisService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(id);
    if (id === 'new') {
      this.planta = <Planta>{};
    } else {
      console.log(this.planta.id);
      this.plantaService.get(this.planta.id).subscribe({
        next: (dataPackage) => {
          const plantaData = <Planta>dataPackage.data;
          console.log(plantaData.id);
          this.planta = plantaData;
          this.registerForm.controls.id.setValue(plantaData.id);
          this.registerForm.controls.pais.setValue(plantaData.pais.nombre);
          this.registerForm.controls.nombre.setValue(plantaData.nombre);
          this.registerForm.controls.cantLecturasOK.setValue(
            plantaData.cantLecturasOK
          );
          this.registerForm.controls.cantAlertasMedias.setValue(
            plantaData.cantAlertasMedias
          );
          this.registerForm.controls.cantAlertasRojas.setValue(
            plantaData.cantAlertasRojas
          );
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        },
        complete: () => {
          console.info('User Data ok');
        },
      });

      this.loginService.userLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        },
      });
    }
  }

  savePlantaDetailsData() {
    if (this.registerForm.valid) {
      this.plantaService
        .save(this.registerForm.value as unknown as Planta)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.planta = this.registerForm.value as unknown as Planta;
          },
          error: (errorData) => console.error(errorData),
        });
    }
  }

  searchPais = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.paisService
          .search(term)
          .pipe(map((response) => <Pais[]>(<unknown>response)))
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
              this.searchFailed = true;
              return of([]);
            })
          )
      ),
      tap(() => (this.searching = false))
    );

  resultFormatPersona(value: any) {
    return `${value.nombre}`;
  }

  inputFormatPersona(value: any) {
    return `${value?.nombre}`;
  }

  goBack(): void {
    this.location.back();
  }
}
