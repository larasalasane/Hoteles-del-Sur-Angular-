import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reservation} from '../models/reservation.model';

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

  getReservations(): Promise<Reservation[] | undefined> {
    return this.http.get<Reservation[]>(`${this.serverPath}`).toPromise();
  }

  getUserReservations(reservationId: string): Promise<Reservation[] | undefined> {
    return this.http.get<Reservation[]>(`${this.serverPath}?userId=${reservationId}`).toPromise();
  }

  updateReservation(reservationId: string, reservationData: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.serverPath}/${reservationId}`, reservationData);
  }

  deleteReservation(reservationId: string): Promise<void> {
    return this.http.delete<void>(`${this.serverPath}/${reservationId}`).toPromise();
  }
}
