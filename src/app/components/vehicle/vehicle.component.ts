import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {
  vehicles: any [] = [];

  constructor(private http: HttpClient){

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
}
