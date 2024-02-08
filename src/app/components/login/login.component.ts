import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router : Router){}

  onSubmit(loginForm : NgForm)
  {
    if(loginForm.valid)
    {
      const {email, password} = loginForm.value;
      this.authService.login(email, password);
      // this.router.navigate(["home"])

    }
    //METTRE UNE REDIRECTION SI LE LOGIN A MARCHE DANS PROFIL
  }
}
