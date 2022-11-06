import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url!: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  public addUser(
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string
  ): Observable<User> {
    return this.http.post<User>(`${this.url}/user`, {
      firstName,
      lastName,
      email,
      dateOfBirth,
    });
  }

  public deleteUser(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.url}/user/${id}`);
  }

  public updateUser(user: User): Observable<{}> {
    return this.http.put<{}>(`${this.url}/update/${user.id}`, user);
  }
}
