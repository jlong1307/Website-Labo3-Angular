import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form-vehicle',
  templateUrl: './add-form-vehicle.component.html',
  styleUrl: './add-form-vehicle.component.scss'
})

export class AddFormVehicleComponent {
  vehicle: any = {
    userId : 0,
    name: '',
    type: 0,
    description: '',
    price: 0,
    address: '',
    img : '',
    people: 0,
    status: 1
  };

  constructor(private userService: UserService, private router : Router){}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        if (user && user.id) {
          this.vehicle.userId = user.id;
        } else {
          console.error('Propriété "id" non trouvée dans l\'objet utilisateur');
        }
      } else {
        console.error('Données utilisateur non trouvées dans le local storage');
      }

      this.userService.addVehicle(
        this.vehicle.userId,
        this.vehicle.type,
        this.vehicle.name,
        this.vehicle.description,
        this.vehicle.address, 
        this.vehicle.people,
        this.vehicle.img,
        this.vehicle.price,
        this.vehicle.status
      ).subscribe(
        (response) => {
          console.log('Vehicle ajouté avec succès :', response);
          // Redirection vers une autre page après l'ajout du Vehicle
          this.router.navigate(['detail']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du Vehicle :', error);
        }
      );
      
      form.resetForm();
    }
  }
}
