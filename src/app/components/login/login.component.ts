import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JwtPayload, jwtDecode } from "jwt-decode";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService){}

  onSubmit(loginForm : NgForm)
  {
    if(loginForm.valid)
    {
      const {email, password} = loginForm.value;
      this.authService.login(email, password);

    }
    const token = this.authService.getToken();
    if(token)
    {
      const decoded = jwtDecode(token);
      if (decoded && decoded.hasOwnProperty('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'))
      {
        const userId = decoded;
        console.log(Object.values(userId)[0]);
      }
    }
  }
}
