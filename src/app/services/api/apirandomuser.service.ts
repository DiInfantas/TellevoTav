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


  getRandomUser(): Observable<any> {
    // Realizar una solicitud GET a la API de RandomUser
    return this.http.get(this.apiUrl);
  }
}


