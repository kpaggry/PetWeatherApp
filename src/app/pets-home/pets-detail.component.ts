import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PetService } from './pet-service';
import { Pet } from '../shared';
import { Subscription } from 'rxjs/Rx';
import { MapService, WeatherService } from '../shared';

import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-pets-detail',
  templateUrl: './pets-detail.component.html'
})
export class PetsDetailComponent implements OnInit, OnDestroy {
  id: number;
  pet: Pet;
  isRain: boolean;
  hasValue: boolean = false;
  private subscription: Subscription;

  constructor(private petService: PetService,
              private activatedRoute: ActivatedRoute,
              private router: Router, private mapService: MapService,
              private weatherService: WeatherService,
              private slimLoadingBarService: SlimLoadingBarService) {
      this.subscription = activatedRoute.params.subscribe(
        (param: any) => {
          this.id = param['id'];
        });
  }

  ngOnInit() {
    this.slimLoadingBarService.start();
    this.pet = this.petService.getPet(this.id);
    this.mapService.getAddy(this.pet.latitude, this.pet.longitude).then(res => {
      this.pet.location = res
      this.slimLoadingBarService.complete();
    });
    this.weatherService.makeItRain(this.pet.latitude, this.pet.longitude).then(res => {
      this.isRain = res
      this.hasValue = true;    
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
