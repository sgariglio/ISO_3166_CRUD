import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WSResponse } from 'src/app/shared/tools/ws-response';
import { ICountry } from '../main/interfaces/i-country';
import { ISubdivision } from '../main/interfaces/i-subdivision';
import { Server_Config } from '../shared/tools/server-root';




const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiDivisionService {

  private url: string = Server_Config.urlApi + '/api/Subdivision/';

  constructor(
    private _http: HttpClient
  ) { }

  addUpdate(country: ISubdivision): Observable<WSResponse> {
    return this._http.post<WSResponse>(this.url + "addUpdate/", country, httpOption)
  }

  delete(id: number): Observable<WSResponse> {
    return this._http.delete<WSResponse>(this.url + "delete/" + id, httpOption)
  }

}
