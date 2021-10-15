import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../login/Interfaces/i-user';
import { Server_Config } from '../shared/tools/server-root';
import { WSResponse } from '../shared/tools/ws-response';


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  private url: string = Server_Config.urlApi + '/api/User/';

  constructor(
    private _http: HttpClient
  ) { }

  private userLogged$ = new Subject<IUser>();
  private userLogged = {} as IUser;
  setUserLogged(user: IUser) {
    this.userLogged = user;
    this.userLogged$.next(user);
  }
  getLoggedUser(): IUser {
    return this.userLogged;
  }
  getObservableUser(): Observable<IUser> {
    return this.userLogged$.asObservable();
  }

  //WEB SERVICE
  getLogin(user: IUser): Observable<WSResponse> {
    return this._http.post<WSResponse>(this.url + "login", user, httpOption)
  }
}
