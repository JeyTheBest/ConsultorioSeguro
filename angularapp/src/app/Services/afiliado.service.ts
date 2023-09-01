import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afiliado } from '../Interfaces/afiliado';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {
  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + "Afiliado/";

  constructor(private http: HttpClient) { }

  getList(): Observable<Afiliado[]> {
    return this.http.get<Afiliado[]>(`${this.apiUrl}Lista`); // Ajusta la ruta según tu API
  }

  add(modelo: Afiliado): Observable<Afiliado>{
    return this.http.post<Afiliado>(`${this.apiUrl}guardar`,modelo); // Ajusta la ruta según tu API
  }

  update(id: number, modelo: Afiliado): Observable<Afiliado> {
    return this.http.put<Afiliado>(`${this.apiUrl}actualizar/${id}`, modelo); // Ajusta la ruta según tu API
  }

  delete(id: number): Observable<void> {
    console.log("ID de Seguro recibido:", id);
    return this.http.delete<void>(`${this.apiUrl}eliminar/${id}`); // Ajusta la ruta según tu API
  }

<<<<<<< HEAD
  getListAfiliadoSeguro(id: number): Observable<Afiliado[]> {
    console.log("ID de Seguro recibido:", id); // Agrega esta línea
    return this.http.get<Afiliado[]>(`${this.apiUrl}ListaSeguro/{id}?idSeguro=${id}` );
=======
  getListAfiliadoSeguro(idSeguro: number): Observable<Afiliado[]> {
    return this.http.get<Afiliado[]>(`${this.apiUrl}ListaSeguro/${idSeguro}`); // Ajusta la ruta según tu API
  }

  ImportarPersonasDesdeExcel(excel: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/CargarArchivo"`, excel); // Ajusta la ruta según tu API
>>>>>>> fbb8a4ad85c49e30f726ca8432d2f0e0dbde7079
  }
 

  importarPersonasDesdeExcel(excel: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}CargarArchivo`, excel); // Ajusta la ruta según tu API
  }



}
