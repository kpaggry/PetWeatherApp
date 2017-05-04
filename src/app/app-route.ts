import { RouterModule, Routes } from '@angular/router';

import { PetsHomeComponent } from './pets-home/pets-home.component';
import { PetsDetailComponent } from './pets-home/pets-detail.component';
import { PetNewComponent } from './pets-home/pet-new.component';
//import { PET_ROUTES } from './pets-home/pets-route';
import { AppComponent } from './app.component';


export const APP_ROUTES: Routes = [
    //{path: '', redirectTo: '/pets', pathMatch: 'full'},
    {path: '', component: PetsHomeComponent },
    {path: 'pet/new', component: PetNewComponent },
    {path: 'pet/:id', component: PetsDetailComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
