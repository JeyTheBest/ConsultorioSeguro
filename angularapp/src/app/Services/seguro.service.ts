import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Seguro } from '../Interfaces/seguro';
@Injectable({
  providedIn: 'root'
})
export class SeguroService {
 
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + "Seguro/";

  constructor(private http: HttpClient) { }

  getList(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(`${this.apiUrl}Lista`); // Ajusta la ruta según tu API

  }

  add(modelo: Seguro): Observable<Seguro> {
    return this.http.post<Seguro>(`${this.apiUrl}guardar`, modelo); // Ajusta la ruta según tu API
  }

  update(id: number, modelo: Seguro): Observable<Seguro> {
    return this.http.put<Seguro>(`${this.apiUrl}actualizar/${id}`, modelo); // Ajusta la ruta según tu API
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}eliminar/${id}`); // Ajusta la ruta según tu API
  }


}



