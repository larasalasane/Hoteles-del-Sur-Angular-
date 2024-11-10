import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://hoteles-del-sur-json-server.onrender.com/api/';
  private resourceName = '/users'
  private serverPath = this.apiUrl + this.resourceName;

  createUser(user : User) : Observable<User> {
    return this.http.post<User>(`${this.serverPath}`, {user});
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.serverPath}`);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverPath}?email=${email}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.serverPath}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serverPath}/${id}`);
  }

}
