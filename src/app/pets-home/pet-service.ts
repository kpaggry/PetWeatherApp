import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pet, PetType, LocalStoreService } from '../shared';

@Injectable()
export class PetService {
  private pets: Pet[];
  private petTypes: PetType[];
  private baseUrl = 'https://petshelterapi20170430022003.azurewebsites.net/api/pet/';
  private headers = new Headers({'Content-Type': 'application/json'});
  private resData = {
    pets: [],
    totalPages: 0,
    totalCount: 0
  }

  constructor(private http: Http, private localStore: LocalStoreService){

  }

  createPet(pet: Pet): Promise<any>{
    return this.http.post(`${this.baseUrl}createpet`, pet, {headers: this.headers})
                .toPromise().then(res => res.json())
                .catch(this.handleError);
  }

  getPets(): Promise<any[]> {
    return this.http.get(`${this.baseUrl}getpets`)
                .toPromise().then(response => this.pets = response.json() as Pet[])
                .catch(this.handleError);
  }

  getPetsPerPage(pageNumber): Promise<any> {
    return this.http.get(`${this.baseUrl}GetPetsPerPage/${pageNumber}`)
                .toPromise().then(res => this.resData = res.json())
                .catch(this.handleError);
  }

  getPetTypes(): Promise<PetType[]> {
    return this.http.get(`${this.baseUrl}getpettypes`)
                .toPromise().then(response => this.petTypes = response.json() as PetType[])
                .catch(this.handleError);
  }

  getBreeds(id){
    if(this.petTypes){
      return this.petTypes.find(type => type.id == parseInt(id)).breeds;
    }
  }

  getCurrentPets(){
    return this.resData.pets;
  }

  getPet(id){
    let pets = this.localStore.getPetsInStore();
    if(pets){
      return pets.find(pet => pet.id == id);
    }

  }

  getAddress (latitude, longitude) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText);
                    var address = data.results[0];
                    if (address) {
                      var properName = ", ";

                      for( let i=0; i<address.address_components.length; i++){
                          if (address.address_components[i].types[0] == "locality")
                              properName = address.address_components[i].short_name + properName;
                          if (address.address_components[i].types[0] == "administrative_area_level_1")
                              properName += address.address_components[i].short_name;
                      }
                      resolve(properName);
                    }
                }
                else {
                    reject(request.status);
                }
            }
        };
        request.send();
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
