import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { PetsHomeComponent } from './pets-home/pets-home.component';
import { PetService } from './pets-home/pet-service';

import { routing } from './app-route';
import { PetsDetailComponent } from './pets-home/pets-detail.component';
import { MapService, WeatherService, LocalStoreService } from './shared';
import { PetNewComponent } from './pets-home/pet-new.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PetsHomeComponent,
    PetsDetailComponent,
    PetNewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    SlimLoadingBarModule.forRoot(),
    LocalStorageModule.withConfig({
            storageType: 'localStorage'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9Ow3429M6o2HHAVfpLV0J0thNgF6yZHo'
    })
  ],
  providers: [PetService, MapService, WeatherService, LocalStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
