import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationDataService {
  private apiUrl = 'https://hoteles-del-sur-json-server.onrender.com/api/';
  private resourceName = '/reservations'
  private serverPath = this.apiUrl + this.resourceName;

  constructor(private http: HttpClient) {
  }

  createReservation(reservationData: Reservation): Promise<Reservation | undefined> {
    return this.http.post<Reservation | undefined>(`${this.serverPath}`, reservationData).toPromise();
  }


  getReservationById(reservationId: string) {
    return this.http.get<Reservation>(`${this.serverPath}/${reservationId}`).toPromise();
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.serverPath}`);
  }

  getUserReservations(reservationId: string): Promise<Reservation[] | undefined> {
    return this.http.get<Reservation[]>(`${this.serverPath}?userId=${reservationId}`).toPromise();
  }

  updateReservation(reservationData: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.serverPath}/${reservationData.id}`, reservationData);
  }

  deleteReservation(reservationId: string): Promise<void> {
    return this.http.delete<void>(`${this.serverPath}/${reservationId}`).toPromise();
  }
}
