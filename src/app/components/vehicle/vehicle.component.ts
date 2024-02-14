import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {
  vehicles: any [] = [];

  constructor(private http: HttpClient, private userService : UserService){

  }

  ngOnInit():void {
    this.getVehicles();
  }

  getVehicles()
  {
    this.http.get<any[]>('https://localhost:7242/api/User/GetAllVehicle').subscribe(
      (data) => {
        this.vehicles = data;
        console.log(this.vehicles);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleFavorite(vehicle: any): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.id) {
        this.userService.addToFavorite(0, vehicle.id, user.id).subscribe(
          (response: any) =>{
            console.log("add To favorite" + response);
          },
          (error) => {
            console.log("Error add to favotire" + error);
          }
        )
      } else {
        console.error('Propriété "id" non trouvée dans l\'objet utilisateur');
      }
    } else {
      console.error('Données utilisateur non trouvées dans le local storage');
    }
  }
}
