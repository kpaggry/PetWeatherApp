import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class WeatherService {
    private baseUrl = 'http://petshelterapi20170430022003.azurewebsites.net/api/weather/';

  constructor(private http: Http){}

  makeItRain(latitude, longitude): Promise<boolean>{
    return this.http.get(`${this.baseUrl}confirmrain?lat=${latitude}&lon=${longitude}`)
                .toPromise().then(response => response.json())
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
