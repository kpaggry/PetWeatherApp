import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Pet } from '../shared';
import { PetType } from '../shared';

@Injectable()
export class LocalStoreService {
  private resData = {
    pets: [],
    totalPages: 0,
    totalCount: 0
  }

  constructor(private localStorageService: LocalStorageService){

  }

  getPetsInStore(){
    return JSON.parse(window.localStorage.getItem('pets'));
    //return this.localStorageService.get('pets') as Pet[];
  }

  setPetIntoStore(pets: Pet[]){
    //this.localStorageService.set('pets', pets);
    window.localStorage.setItem('pets', JSON.stringify(pets));
  }
}
