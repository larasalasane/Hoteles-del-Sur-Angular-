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

  getRooms(): Observable<Room[] | undefined> {
    return this.http.get<Room[]>(`${this.apiUrl}`);
  }

  getRoomById(id: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiUrl}?id=${id}`);
  }

  deleteRoom(roomId: string): Promise<void> {
    return this.http.delete<void>(`${this.apiUrl}/${roomId}`).toPromise();
  }
}
