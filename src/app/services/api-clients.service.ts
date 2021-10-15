import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WSResponse } from 'src/app/shared/tools/ws-response';
import { Server_Config } from '../shared/tools/server-root';




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


}
