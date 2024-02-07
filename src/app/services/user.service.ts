import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'https://exemple.com/api/users'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient, private authService : AuthService) { }

  // Méthode pour récupérer les détails de l'utilisateur à partir de l'API
  getUserDetails(userId : number): Observable<any> {
    return this.http.get<any>('https://localhost:7242/api/User/'+ userId);
  }
}
