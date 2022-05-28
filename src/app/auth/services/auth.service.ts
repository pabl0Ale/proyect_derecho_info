import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  http: HttpClient) { }


  agregarHereo(hereo:any){
    return this.http.post<any>(`http://localhost:4000/usuario/nuevo`, hereo)
  }

  verificarUser(correo:any ,password :any){
    return this.http.get<any>(`http://localhost:4000/usuario/get/?correo=${correo}&password=${password}` )
  }

}
