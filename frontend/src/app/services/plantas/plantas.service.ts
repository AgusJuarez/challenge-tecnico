import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Data } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DataPackage } from '../../data-package';
import { Planta } from '../../components/plantas/planta';

@Injectable({
  providedIn: 'root',
})
export class PlantaService {
  private plantaUrl = environment.urlApi + 'plantas'; // URL to web api

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.plantaUrl);
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.plantaUrl + '/id/' + id);
  }

  save(planta: Planta): Observable<DataPackage> {
    return planta.id
      ? this.http.put<DataPackage>(this.plantaUrl, planta)
      : this.http.post<DataPackage>(this.plantaUrl, planta);
  }

  remove(id: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.plantaUrl}/id/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }

  getEstadisticas(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.plantaUrl + '/estadisticas');
  }
}
