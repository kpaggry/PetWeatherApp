import { Breed } from './breed';
import { PetType } from './petType';

export class Pet {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  type: PetType;
  breed: Breed;
}
