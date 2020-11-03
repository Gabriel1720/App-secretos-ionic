import { Injectable } from '@angular/core';
import {Credenciales} from './credenciales';
import {HttpClient, HttpParams} from '@angular/common/http'
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
}
