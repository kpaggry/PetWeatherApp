import {Routes} from '@angular/router';
import { PetsHomeComponent } from './pets-home.component';
import { PetsDetailComponent } from './pets-detail.component';
import { PetNewComponent } from './pet-new.component';

export const PET_ROUTES: Routes = [
  {path: '', component: PetsHomeComponent },
  {path: 'new', component: PetNewComponent },
  {path: ':id', component: PetsDetailComponent },
]
