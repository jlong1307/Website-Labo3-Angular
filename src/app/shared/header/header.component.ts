import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  isConnected?: boolean;

  constructor(private authService : AuthService){}

  ngOnInit() {
    this.authService.sujetAObserver.subscribe({
      next : (data : boolean) => this.isConnected = data
    })
    this.authService.sendIsConnectedValue()
  }

  logout(){
    this.authService.logout()
  }
}
