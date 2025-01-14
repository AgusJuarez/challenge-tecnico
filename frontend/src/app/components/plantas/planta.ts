import { Pais } from './pais';

export interface Planta {
  id: number;
  pais: Pais;
  nombre: string;
  cantLecturasOK: number;
  cantAlertasMedias: number;
  cantAlertasRojas: number;
}
