import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUserDetails(userName): Observable<any>{
    return this.http.get(`https://api.github.com/users/${userName}`, {});
  }
}
