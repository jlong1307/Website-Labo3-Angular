import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.scss'
})
export class HousingComponent {
  housings: any[] = [];

  constructor(private http: HttpClient, private userService : UserService){}
  
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

  toggleFavorite(housing: any): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user && user.id) {
        this.userService.addToFavorite(housing.id, 0, user.id).subscribe(
          (response: any) =>{
            console.log("add To favorite" + response);
          },
          (error) => {
            console.log("Error add to favotire" + error);
          }
        )
      } else {
        console.error('Housing"id" non trouvée dans l\'objet utilisateur');
      }
    } else {
      console.error('Données utilisateur non trouvées dans le local storage');
    }
  }
}
