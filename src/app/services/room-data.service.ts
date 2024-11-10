import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Room} from '../models/room.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private apiUrl = 'https://hoteles-del-sur-json-server.onrender.com/api/';
  private resourceName = '/rooms'
  private serverPath = this.apiUrl + this.resourceName;

  constructor(private http: HttpClient) {
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.serverPath}`, room);
  }

  getRooms(): Promise<Room[] | undefined> {
    return this.http.get<Room[]>(`${this.serverPath}`).toPromise();
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.serverPath}?id=${id}`);
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.serverPath}?id=${id}`, room);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.serverPath}?id=${id}`);
  }
}
