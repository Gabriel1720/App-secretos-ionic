import { Injectable } from '@angular/core';
import {Credenciales} from './credenciales';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSecretosService {

  constructor(
    private httpClient: HttpClient
  ) { }
 
 
  login(user):Observable<any>{
    const options = new HttpParams({fromString: `username=${user.username}&password=${user.password}`} ) ;  
 
    return  this.httpClient.post<any>(`${Credenciales.APP_URL}/token`, options)
  }

  listaSecretos(token): Observable<any>{

      const header = {
        headers : new HttpHeaders({
            Authorization: `Bearer ${token}`
        })
      };
  
    return this.httpClient.get<any>(`${Credenciales.APP_URL}/usuario/secretos`, header); 
 }


  deleteSecreto(id:BigInteger, token:string):Observable<any>{
    const header = {
      headers : new HttpHeaders({
          Authorization: `Bearer ${token}`
      })
    };

    return this.httpClient.delete<any>(`${Credenciales.APP_URL}/usuario/secreto/${id}`, header); 
  }

}
