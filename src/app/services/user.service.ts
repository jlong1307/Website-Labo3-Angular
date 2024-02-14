import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private authService : AuthService) { }

  getUserDetails(userId : number): Observable<any> {
    return this.http.get<any>('https://localhost:7242/api/User/'+ userId);
  }
  
  UpdateDetail(id: number, firstname : string, lastname : string, email: string, address :string, password: string, status: number): Observable<any> {
    return this.http.patch('https://localhost:7242/api/User', {id, firstname, lastname, email, address, password, status})
  }
  
  getVehicles(userId : number): Observable<any>
  {
    return this.http.get<any[]>('https://localhost:7242/api/User/GetAllVehicle/' + userId);
  }

  getHousings(userId : number): Observable<any>
  {
    return this.http.get<any[]>('https://localhost:7242/api/User/GetAllHousing/' + userId);
  }

  deleteVehicle(id : number):Observable<any>{
    return this.http.delete<any>('https://localhost:7242/api/User/DeleteVehicle/' + id);
  }

  deleteHousing(id: number) : Observable<any>{
    return this.http.delete<any>('https://localhost:7242/api/User/DeleteHousing/' + id);
  }

  addHousing(userId: number, type: number, name: string, description : string, address:  string, img : string, price: number, nbrPeople: number,
              nbrRooms: number, nbrKitchen: number, nbrBathroom: number, swimmingPool: number, garden: number, balcon: number, status: number): Observable<any>{

    return this.http.post<any>('https://localhost:7242/api/User/AddHousing', {userId, type, name, description, address, img, price, nbrPeople, nbrRooms, nbrKitchen,
                                                                                nbrBathroom, swimmingPool, garden, balcon, status});
  }


  addVehicle(userId: number, type: number, name: string, description : string, address:  string, people: number, img : string, price: number, status: number): Observable<any>{

  return this.http.post<any>('https://localhost:7242/api/User/AddVehicle', {userId, type, name, description, address, people, img, price, status});
}

  addToFavorite(housingId: number, vehicleId: number, userId: number): Observable<any>
  {
    return this.http.post<any>('https://localhost:7242/api/User/AddFavorite', {housingId, vehicleId, userId});
  }

  getFavorites():Observable<any>
  {
    return this.http.get<any>('https://localhost:7242/api/User/GetAllFavorite');
  }

  deleteFavorite(id: number): Observable<any>
  {
    return this.http.delete<any>('https://localhost:7242/api/User/DeleteFavorite/' + id);
  }

  updateHousing(id: number, userId: number, type: number, name: string, description : string, address:  string, img : string, price: number, nbrPeople: number,
    nbrRooms: number, nbrKitchen: number, nbrBathroom: number, swimmingPool: number, garden: number, balcon: number, status: number): Observable<any>{

    return this.http.patch<any>('https://localhost:7242/api/User/UpdateHousing', {id, userId, type, name, description, address, img, price, nbrPeople, nbrRooms, nbrKitchen,
                                                                      nbrBathroom, swimmingPool, garden, balcon, status});
  }

  updateVehicle(id: number, userId: number, type: number, name: string, description : string, address:  string, people: number, img : string, price: number, status: number): Observable<any>{

    return this.http.patch<any>('https://localhost:7242/api/User/UpdateVehicle', {id, userId, type, name, description, address, people, img, price, status});
  }
}
