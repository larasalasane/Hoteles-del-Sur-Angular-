import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'https://hoteles-del-sur-json-server.onrender.com/api/';
  private resourceName = '/services'
  private serverPath = this.apiUrl + this.resourceName;

  constructor(
    private http: HttpClient
  ) { }

  async getAllServices(): Promise< Service[] | undefined>{
    return this.http.get<Service[]>(`${this.serverPath}`).toPromise();
  }
}
