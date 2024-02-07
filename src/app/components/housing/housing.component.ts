import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.scss'
})
export class HousingComponent {
  housings: any[] = [];

  constructor(private http: HttpClient){}
  
  ngOnInit():void{
    this.getHousings();
  }

  getHousings()
  {
    this.http.get<any[]>('https://localhost:7242/api/User/GetAllHousing').subscribe((data) => {
      this.housings = data;
      console.log(this.housings);
    },
    (error) =>{
      console.error(error);
    }
    );
  }
}
