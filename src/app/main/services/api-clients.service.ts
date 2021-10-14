import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server_Config } from 'src/app/security/Services/server-root';
import { WSResponse } from 'src/app/shared/tools/ws-response';
import { IClient } from '../class/client/iclient';


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiClientsService {

  private url: string = Server_Config.urlApi + '/api/Client/';

  constructor(
    private _http: HttpClient
  ) { }

  //POST
  add(client: IClient): Observable<WSResponse> {
    let path = this.url + "clientAdd/"
    return this._http.post<WSResponse>(path, client);
  }
  delete(client: IClient): Observable<WSResponse> {
    let path = this.url + "clientDelete/"
    return this._http.post<WSResponse>(path, client);
  }
  //GET
  getById(clientId: number): Observable<WSResponse> {
    let path = this.url + "getById/" + clientId
    return this._http.get<WSResponse>(path);
  }
  getClientTypes(): Observable<WSResponse> {
    let path = this.url + "getClientTypes/"
    return this._http.get<WSResponse>(path);
  }
  getClientList(onwnerId: number): Observable<WSResponse> {
    let path = this.url + "getClientList/" + onwnerId
    return this._http.get<WSResponse>(path);
  }
  getClientsCount(onwnerId: number): Observable<WSResponse> {
    let path = this.url + "getClientsCount/" + onwnerId
    return this._http.get<WSResponse>(path);
  }

}
