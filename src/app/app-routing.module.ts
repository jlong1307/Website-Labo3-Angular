import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { HousingComponent } from './components/housing/housing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DetailComponent } from './components/detail/detail.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { AddFormVehicleComponent } from './components/add-form-vehicle/add-form-vehicle.component';
import { EditHousingComponent } from './components/edit-housing/edit-housing.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component : HomeComponent},
  { path: 'vehicle', component: VehicleComponent },
  { path: 'housing', component: HousingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'detail', component: DetailComponent},
  {path: 'add-form', component:AddFormComponent},
  {path: 'add-form-vehicle', component:AddFormVehicleComponent},
  {path :'edit-housing', component:EditHousingComponent},
  {path :'edit-vehicle', component:EditVehicleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
