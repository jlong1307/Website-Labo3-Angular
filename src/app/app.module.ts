import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { HousingComponent } from './components/housing/housing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { DetailComponent } from './components/detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TieInterceptor } from './shared/tie.interceptor';
import { AddFormComponent } from './components/add-form/add-form.component';
import { AddFormVehicleComponent } from './components/add-form-vehicle/add-form-vehicle.component';
import { EditHousingComponent } from './components/edit-housing/edit-housing.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    VehicleComponent,
    HousingComponent,
    RegisterComponent,
    LoginComponent,
    DetailComponent,
    AddFormComponent,
    AddFormVehicleComponent,
    EditHousingComponent,
    EditVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TieInterceptor, multi:true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
