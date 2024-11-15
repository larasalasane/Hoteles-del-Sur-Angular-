import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://localhost:3000/services';
  constructor( 
    private http: HttpClient
  ) { }

  async getAllServices(): Promise< Service[] | undefined>{
    return this.http.get<Service[]>(`${this.apiUrl}`).toPromise();
  }

  async addService(newService: Service): Promise<Service | undefined> { 
    return this.http.post<Service>(`${this.apiUrl}`, newService).toPromise();
  }

  /*
  async getService(serviceId: string): Promise<Service| undefined> {
    return await this.getServiceById(serviceId);
  }
  */

  getService(serviceId: string): Promise<Service | undefined> {
    return this.http.get<Service | undefined>(`${this.apiUrl}/${serviceId}`).toPromise(); 
  }
  
  /*
  getService(serviceId: string) {
    return this.http.get<Service>(`${this.apiUrl}/${serviceId}`).toPromise();
  }
  */

  getServiceById(serviceId: string): Promise<Service[]| undefined> {
    return this.http.get<Service[]>(`${this.apiUrl}/${serviceId}`).toPromise();
  }

  deleteService(serviceId: string): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/${serviceId}`).toPromise();
  }
}
