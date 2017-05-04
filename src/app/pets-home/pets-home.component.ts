import { Component, OnInit } from '@angular/core';
import { PetService } from './pet-service';
import { Pet, LocalStoreService } from '../shared';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-pets-home',
  templateUrl: './pets-home.component.html'
})

export class PetsHomeComponent implements OnInit {
  pets: Pet[];
  totalPages: number;
  pagesList: any[];
  pageNumber: number = 1;
  loadMap: boolean = false;

  lat: number = 54.5260;
  lng: number = 105.2551;
  icon: string = "http://downloadicons.net/sites/default/files/dog-icon-87372.png";

  constructor(private petService: PetService,
              private localStore: LocalStoreService,
              private slimLoadingBarService: SlimLoadingBarService) { }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.petService.getPetsPerPage(this.pageNumber).then((res) => {
      this.pets = res.pets as Pet[];
      this.totalPages = res.totalPages;
      this.pagesList = this.toArray(res.totalPages);
      this.loadMap = true;
      this.localStore.setPetIntoStore(res.pets as Pet[]);
      this.slimLoadingBarService.complete();
    });
  }

  toPage(num){
    this.pageNumber = num;
    this.slimLoadingBarService.start();
    this.petService.getPetsPerPage(num).then((res) => {
      this.pets = res.pets as Pet[];
      this.localStore.setPetIntoStore(res.pets as Pet[]);
      this.slimLoadingBarService.complete();
    });
  }

  getUrl(type){
    if(type === 'Dog') return "../assets/dog.png";
    return "../assets/cat.png";
  }

  toArray(total){
    let x = [];
    for (let i=1;i<=total;i++) {
      x.push(i);
    }
    return x;
  }
}
