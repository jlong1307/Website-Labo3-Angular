import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

export class DetailComponent {
  
  user: any;
  userId : number = 0;
  constructor(private userService: UserService, private authService : AuthService){}

  ngOnInit():void {
    this.userService.getUserDetails(this.authService.getUserId()).subscribe(
      (data: any) =>{
        console.log(data);
        this.user = data;
      },
      (error: any) =>{
        console.error('Error get Details');
      }
    )
  }
}
