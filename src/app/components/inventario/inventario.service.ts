import { Inventario } from './inventario';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  URL_BACKEND = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getAllInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.URL_BACKEND + 'inventario');
  }

  getInventarioById(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(this.URL_BACKEND + '/inventario/' + id);
  }

  deleteInventario(inventario: Inventario): Observable<Inventario> {
    return this.http.delete<Inventario>(
      this.URL_BACKEND + '/inventario/' + inventario.id_inventario
    );
  }

  saveInventario(inventario: Inventario): Observable<any> {
    return this.http.post(this.URL_BACKEND + '/inventario/', inventario);
  }

  updateInventario(id: number, inventario: Inventario): Observable<any> {
    return this.http.put(this.URL_BACKEND + '/inventario/' + id, inventario);
  }

  getAlmacen(): Observable<any> {
    return this.http.get(this.URL_BACKEND + '/consulta-alm');
  }

  getPelicula(): Observable<any> {
    return this.http.get(this.URL_BACKEND + 'pelicula-idNom');
  }
}
