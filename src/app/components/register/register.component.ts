import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService : AuthService)
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
        },
        (error) =>{
          console.error(error);
        }
      );
    }
  }
}
