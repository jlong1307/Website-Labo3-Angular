import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})

export class DetailComponent implements OnInit {
  
  user: any;
  userId : number = 0;
  editMode : boolean = false;
  userForm!: FormGroup;
  vehicles: any [] = [];
  housings: any [] = [];
  favorites: any [] = [];

  constructor(private userService: UserService, private authService : AuthService, private formBuilder: FormBuilder, private router: Router){}

  ngOnInit():void {
    this.userService.getUserDetails(this.authService.getUserId()).subscribe(
      (data: any) =>{
        console.log(data);
        this.user = data;
        localStorage.setItem('user', JSON.stringify(data));
        this.editMode = false;
        this.getVehicles();
        this.getHousings();
        this.getFavorites();
      },
      (error: any) =>{
        console.error('Error get Details');
      }
    )

    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  editUser():void {
    this.editMode = true;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userId = this.user["id"];
      const { firstname, lastname, email, address, password } = this.userForm.value;
  
      this.userService.UpdateDetail(userId, firstname, lastname, email, address, password, 1)
        .subscribe(
          (response: any) => {
            console.log('User details updated successfully:', response);
            // Mettre à jour les détails de l'utilisateur ou faire d'autres actions si nécessaire
            this.user.firstname = firstname;
            this.user.lastname = lastname;
            this.user.email = email;
            this.user.address = address;
            this.user.password = password;

            localStorage.setItem('user', JSON.stringify(this.user));
            this.editMode =false;

          },
          (error: any) => {
            console.error('Error updating user details:', error);
          }
        );
    }
  }


  getVehicles()
  {
    const userId = this.user["id"];
    this.userService.getVehicles(userId).subscribe(
      (response : any) => {
        this.vehicles = response;
        console.log("My vehicles");
        console.log(this.vehicles)
      },
      (error :any) => {
        console.log("Error get Vehicles");
      }
    )
  }

  getHousings()
  {
    const userId = this.user["id"];
    this.userService.getHousings(userId).subscribe(
      (response : any) => {
        this.housings = response;
        console.log("My housings");
      },
      (error :any) => {
        console.log("Error get housings");
      }
    )
  }

  deletevehicle(id :number)
  {
    this.userService.deleteVehicle(id).subscribe(
      (response : any) => {
        this.getVehicles();
      },
      (error:any) =>{
        console.error("Error delete vehicle");
      }
    )
  }

  deletehousing(id : number)
  {
    this.userService.deleteHousing(id).subscribe(
      (response:any) =>{
        this.getHousings();
      },
      (error:any) =>{
        console.error("Error delete housing");
      }
    )
  }

  addHousing(){
    this.router.navigate(['add-form']);
  }

  addVehicle()
  {
    this.router.navigate(['add-form-vehicle']);
  }


  getFavorites()
  {
    this.userService.getFavorites().subscribe(
      (response : any) => {
        this.favorites = response;
        console.log( response);
      },
      (error :any) => {
        console.log("Error get Favorites");
      }
    )
  }

  deleteFavorite(id : number)
  {
    this.userService.deleteFavorite(id).subscribe(
      (response: any) => {
        this.getFavorites();
      },
      (error:any)=>{
        console.log("Error delete favorite");
      }
    );
  }

  editHousing(housing: any): void {
    this.router.navigate(['/edit-housing', { housing: JSON.stringify(housing) }]);
  }

  editVehicle(vehicle: any): void {
    this.router.navigate(['/edit-vehicle', { vehicle: JSON.stringify(vehicle) }]);
  }
}
