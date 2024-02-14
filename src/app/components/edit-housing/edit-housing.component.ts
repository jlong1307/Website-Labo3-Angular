import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-housing',
  templateUrl: './edit-housing.component.html',
  styleUrl: './edit-housing.component.scss'
})
export class EditHousingComponent {

  housing: any = {
    id: 0,
    userId : 0,
    name: '',
    type: 0,
    description: '',
    price: 0,
    address: '',
    img : '',
    nbrPeople: 0,
    nbrKitchen: 0,
    nbrBathroom: 0,
    swimmingPool: 0,
    garden: 0,
    balcon: 0,
    status: 1
  };

  constructor(private route : ActivatedRoute, private userService : UserService, private router: Router){}

  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.housing = JSON.parse(params['housing']);
    }) 
  }

  submitForm(): void {
    this.userService.updateHousing(
      this.housing.id,
      this.housing.userId,         // ID de l'utilisateur
      this.housing.type,           // Type de logement
      this.housing.name,           // Nom du logement
      this.housing.description,    // Description du logement
      this.housing.address,        // Adresse du logement
      this.housing.img,            // URL de l'image du logement
      this.housing.price,          // Prix du logement
      this.housing.nbrPeople,      // Nombre de personnes pouvant loger dans le logement
      this.housing.nbrRoom,        // Nombre de chambres du logement
      this.housing.nbrKitchen,     // Nombre de cuisines du logement
      this.housing.nbrBathroom,    // Nombre de salles de bains du logement
      this.housing.swimmingPool = this.housing.swimmingPool ? 1 : 0,
      this.housing.garden = this.housing.garden ? 1 : 0,
      this.housing.balcon = this.housing.balcon ? 1 : 0,
      this.housing.status         // Statut du logement (par exemple : disponible, occupé, etc.)
    ).subscribe(
      (response) => {
        console.log('Update housing succed ', response);
        // Redirection vers une autre page après l'ajout du logement
        this.router.navigate(['detail']);
      },
      (error) => {
        console.error('Update housing failed :', error);
      }
    );
  }
}
