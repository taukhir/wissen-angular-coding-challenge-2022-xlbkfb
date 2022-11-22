import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private URL = 'https://reqres.in/api/login';
  constructor(private http: HttpClient) {}

  // modify the return type to properly use the full response
  login(username: string, password: string): Observable<any> {
    username = 'eve.holt@reqres.in';
    password = 'cityslicka';
    return this.http.post(this.URL, { email: username, password: password });
  }
}
