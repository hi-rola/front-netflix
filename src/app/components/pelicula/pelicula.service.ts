import { Pelicula } from './Pelicula';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  URL_BACKEND = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getAllPelicula(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.URL_BACKEND + '/pelicula/');
  }

  getPeliculaById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(this.URL_BACKEND + '/pelicula/' + id);
  }

  deletePelicula(id: number): Observable<any> {
    return this.http.delete(this.URL_BACKEND + '/pelicula/' + id);
  }

  savePelicula(pelicula: Pelicula): Observable<any> {
    return this.http.post(this.URL_BACKEND + '/pelicula/', pelicula);
  }

  updatePelicula(id: number, pelicula: Pelicula): Observable<any> {
    return this.http.put(this.URL_BACKEND + '/pelicula/' + id, pelicula);
  }

  getAllIdioma(): Observable<any> {
    return this.http.get(this.URL_BACKEND + '/consulta-idi/');
  }
}
