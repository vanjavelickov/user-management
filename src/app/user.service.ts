import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { Result } from './result.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url!: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080';
  }

  public findAll(): Observable<Result> {
    return this.http.get<Result>(`${this.url}/users`);
  }

  public addUser(
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string
  ): Observable<User> {
    dateOfBirth = this.fixDate(dateOfBirth);
    return this.http.post<User>(`${this.url}/users`, {
      firstName,
      lastName,
      email,
      dateOfBirth,
    });
  }

  public deleteUser(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.url}/users/${id}`);
  }

  public updateUser(user: User): Observable<{}> {
    user.dateOfBirth = this.fixDate(user.dateOfBirth);
    return this.http.put<{}>(`${this.url}/users`, user);
  }

  public handleError(err: HttpErrorResponse): string {
    let errorMessage: string = '';

    if (err.status === 400) {
      errorMessage = 'Bad request';
    }
    if (err.status === 404) {
      errorMessage = 'Not Found';
    }
    if (err.status === 500) {
      errorMessage = 'Server error';
    } 
    else {
      errorMessage = 'There has been an error'
    }
    return errorMessage;
  }

  private fixDate(date: string): string {
    let newDate = new Date(date);
    let month = newDate.getMonth();
    if (month < 12) 
      month++;
    let strMonth = (month < 10) ? '0' + month : month;

    let day = newDate.getDate();
    let strDay = (day < 10) ? '0' + day : day;

    return `${newDate.getFullYear()}-${strMonth}-${strDay}`;
  }
}
