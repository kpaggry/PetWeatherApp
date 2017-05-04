import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MapService {
  private baseUrl = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';
  private options = {
    enableHighAccuracy: true,
    maximumAge: 0
  };

  constructor(private http: Http){

  }

  getAddy(latitude, longitude): Promise<string>{
    return this.http.get(this.baseUrl + latitude + ',' + longitude + '&sensor=true')
                .toPromise().then(response => this.getShortAddress(response.json()))
                .catch(this.handleError);
  }

  getShortAddress(response){
    let address = response.results[0];
    let properName = ", "
    if (address) {
      for( let i=0; i<address.address_components.length; i++){
          if (address.address_components[i].types[0] == "locality")
              properName = address.address_components[i].short_name + properName;
          if (address.address_components[i].types[0] == "administrative_area_level_1")
              properName += address.address_components[i].short_name;
      }
    }
    return properName;
  }

  getCurrentLocation(cb){
    let root = this;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos) => {
        let data : any = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          loc: ""
        };
        return root.getAddy(pos.coords.latitude, pos.coords.longitude)
        .then((res) => {
          data.loc = res;
          cb(data);
        });
      }, this.handleError, this.options)
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
