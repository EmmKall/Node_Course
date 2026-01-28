import { HeroI } from '@interfaces/Hero.interface';
import { findheroeByID } from '@services/HeroService';

const id: number = 7;

const hero: HeroI | undefined = findheroeByID(id);
console.log(hero);
console.log(hero?.name ?? `Hero no found with id: ${id}`); 