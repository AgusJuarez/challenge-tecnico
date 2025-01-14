import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataPackage } from '../../data-package';
import { Pais } from '../../components/plantas/pais';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private paisUrl = environment.urlApi + 'pais'; // URL to web api

  constructor(private http: HttpClient) {}

  search(text: string): Observable<Pais> {
    return this.http.get<Pais>(`${this.paisUrl}/search/${text}`);
  }
}
