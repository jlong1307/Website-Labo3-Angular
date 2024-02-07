import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'Token';

  constructor(private http: HttpClient) { }

  register(firstname: string, lastname: string, email: string, password : string, address: string, status : number): Observable<any> {
    let result;

    result = this.http.post<any>('https://localhost:7242/api/User', {firstname, lastname, email, password, address, status});
    return result;
  }

  login(email : string, password : string) {
    this.http.post('https://localhost:7242/api/Auth', {email, password}, {responseType : "text"}).subscribe({
      next : (token : string) => {
        // console.log(token);
        this.setToken(token);
        // this.sujetAObserver.next(this.isConnected) 
      },
      error : (error) => console.log(error),
      complete : () => console.log("c'est fini")

    })
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
