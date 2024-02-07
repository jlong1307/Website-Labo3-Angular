import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { JwtPayload, jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'Token';

  sujetAObserver : Subject<boolean> = new Subject<boolean>()

  get isConnected() : boolean {
    return localStorage.getItem(this.TOKEN_KEY) != undefined
  }
  
  constructor(private http: HttpClient, private router : Router) { }

  sendIsConnectedValue() {
    this.sujetAObserver.next(this.isConnected)
  }

  register(firstname: string, lastname: string, email: string, password : string, address: string, status : number): Observable<any> {
    let result;

    result = this.http.post<any>('https://localhost:7242/api/User', {firstname, lastname, email, password, address, status});
    return result;
  }

  login(email : string, password : string) {
    this.http.post('https://localhost:7242/api/Auth', {email, password}, {responseType : "text"}).subscribe({
      next : (token : string) => {
        this.setToken(token);
        this.sujetAObserver.next(this.isConnected);
      },
      error : (error) => console.log(error),
      complete : () => console.log("c'est fini")

    })
  }

  logout() {
    localStorage.removeItem("Token")
    this.sujetAObserver.next(this.isConnected)
    this.router.navigate(["home"])
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

  getUserId(){
    const token = this.getToken();
    if(token)
    {
      const decoded = jwtDecode(token);
      if (decoded && decoded.hasOwnProperty('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'))
      {
        return Object.values(decoded)[0];
      }
    }
  }
}
