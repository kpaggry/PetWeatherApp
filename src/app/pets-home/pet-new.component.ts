import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetService } from './pet-service';
import { PetType, Breed, MapService, Pet } from '../shared';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-pet-new',
  templateUrl: './pet-new.component.html'
})
export class PetNewComponent implements OnInit {
  newPetForm: FormGroup;
  petTypes: PetType[];
  breeds: Breed[];
  response = {
    status: '',
    message: ''
  };

  locationData : any = {
    lat: '',
    lon: '',
    loc: ''
  };

  warning: boolean = false;
  success: boolean = false;
  failed: boolean = false;

  constructor(private petService: PetService,
              private mapService: MapService,
              private slimLoadingBarService: SlimLoadingBarService) {
    this.newPetForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required),
      'latitude': new FormControl('', Validators.required),
      'longitude': new FormControl('', Validators.required),
      'type': new FormControl('', Validators.required),
      'breed': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.petService.getPetTypes().then((res) => {
      this.petTypes = res;
    });
    this.slimLoadingBarService.start();
    this.mapService.getCurrentLocation((data) =>{
      this.newPetForm.controls['location'].setValue(data.loc);
      this.newPetForm.controls['latitude'].setValue(data.lat);
      this.newPetForm.controls['longitude'].setValue(data.lon);
      this.slimLoadingBarService.complete();
    });
  }

  onSelect(typeId) {
    this.breeds = [];
    if(typeId != ""){
      //this.breeds = this.petTypes.find(type => type.id == parseInt(typeId)).breeds;
      this.breeds = this.petService.getBreeds(typeId);
    }
  }

  onSubmit(){
    let pet: Pet;
    pet = this.newPetForm.value as Pet;
    pet.type.breeds = [];
    this.slimLoadingBarService.start();
    this.petService.createPet(pet).then(res => {
      this.warning = false;
      this.success = false;
      this.failed = false;
      this.response = res;
      if(this.response.status === "exists") this.warning = true;
      if(this.response.status === "success") this.success = true;
      if(this.response.status === "failed") this.failed = true;
      this.slimLoadingBarService.complete();
    });
  }
}
