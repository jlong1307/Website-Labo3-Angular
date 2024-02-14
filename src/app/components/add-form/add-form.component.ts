import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.scss'
})

export class AddFormComponent {
  housing: any = {
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
  
  constructor(private userService: UserService, private router : Router){}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        if (user && user.id) {
          this.housing.userId = user.id;
        } else {
          console.error('Propriété "id" non trouvée dans l\'objet utilisateur');
        }
      } else {
        console.error('Données utilisateur non trouvées dans le local storage');
      }

      this.userService.addHousing(
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
          console.log('Logement ajouté avec succès :', response);
          // Redirection vers une autre page après l'ajout du logement
          this.router.navigate(['detail']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du logement :', error);
        }
      );
      
      form.resetForm();
    }
  }
}
