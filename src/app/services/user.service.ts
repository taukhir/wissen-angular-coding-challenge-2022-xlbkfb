import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private URL = 'https://reqres.in/api/user';
  constructor(private http: HttpClient) {}

  // modify the return type to properly use the full response
  getUsers(): Observable<any> {
    return this.http.get(this.URL);
  }
}
