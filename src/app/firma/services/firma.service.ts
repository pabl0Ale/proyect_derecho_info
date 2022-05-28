import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  constructor(private  http: HttpClient) { }
  obtenerUser(id:any){
    return this.http.get<any>(`http://localhost:4000/usuario/user/${id}`,)
  }
  FirmarDocumento(datos:any){
    return this.http.post<any>(`http://localhost:4000/documento/guardar`, datos)
  }
  VerificarDocumento(firma:any){
    return this.http.get<any>(`http://localhost:4000/documento/Verificar/?firma=${firma}`)
  }
  HistorialDocumentos(id:any){
    return this.http.get<any>(`http://localhost:4000/documento/historial/?usuario=${id}`)
  }
}
