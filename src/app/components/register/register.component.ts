import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService : AuthService, private router: Router)
  {

  }

  onSubmit(registerForm : NgForm)
  {
    if(registerForm.valid)
    {
      const {firstname, lastname, email, password, address} = registerForm.value;
      this.authService.register(firstname, lastname, email, password, address, 1).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['home']);
        },
        (error) =>{
          console.error(error);
        }
      );
    }
  }
}
