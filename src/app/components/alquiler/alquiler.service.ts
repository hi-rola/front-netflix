import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from './Alquiler';

@Injectable({
  providedIn: 'root',
})
export class AlquilerService {
  URL_BACKEND = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getAllAlquiler(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.URL_BACKEND + '/alquiler/');
  }

  getAlquilerById(id: number): Observable<Alquiler> {
    return this.http.get<Alquiler>(this.URL_BACKEND + '/alquiler/' + id);
  }

  getPeliculaByIdInventario(id: number): Observable<any> {
    return this.http.get<any>(this.URL_BACKEND + '/inventario-peli/' + id);
  }

  saveAlquiler(alquiler: Alquiler): Observable<any> {
    return this.http.post(this.URL_BACKEND + '/alquiler/', alquiler);
  }

  updateAlquiler(id: number, alquiler: Alquiler): Observable<any> {
    return this.http.put(this.URL_BACKEND + '/alquiler/' + id, alquiler);
  }

  deleteAlquiler(id: number): Observable<any> {
    return this.http.delete(this.URL_BACKEND + '/alquiler/' + id);
  }

  getAllEmpleado(): Observable<any> {
    return this.http.get(this.URL_BACKEND + '/consulta-emp/');
  }

  getAllPeliculaIdNombre(): Observable<any> {
    return this.http.get(this.URL_BACKEND + '/pelicula-idNom/');
  }

  getAllClienteIdNombre(): Observable<any> {
    return this.http.get(this.URL_BACKEND + '/cliente-idNom/');
  }
}
