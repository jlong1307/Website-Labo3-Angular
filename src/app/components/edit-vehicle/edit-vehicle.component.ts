import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss'
})
export class EditVehicleComponent {
  vehicle: any = {
    id: 0,
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

  constructor(private route : ActivatedRoute, private userService : UserService, private router: Router){}

  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.vehicle = JSON.parse(params['vehicle']);
    }) 
  }

  submitForm():void {
    this.userService.updateVehicle(
      this.vehicle.id,
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
        console.log('Vehicle Updated :', response);
        // Redirection vers une autre page après l'ajout du Vehicle
        this.router.navigate(['detail']);
      },
      (error) => {
        console.error('Fail vehicle update :', error);
      }
    );
  }
}
