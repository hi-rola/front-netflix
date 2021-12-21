import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  URL_BACKEND = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getAllCliente(): Observable<any> {
    return this.http.get(this.URL_BACKEND + 'cliente');
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(this.URL_BACKEND + '/cliente/' + id);
  }
}
