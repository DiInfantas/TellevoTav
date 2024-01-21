import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApirandomuserService {
  HttpClient() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://randomuser.me/api/';

  constructor(private http: HttpClient) { }

  


  getFourUserData(): Observable<any> {
    const url = `${this.apiUrl}?results=1`;

    return this.http.get(url);
  }
}


