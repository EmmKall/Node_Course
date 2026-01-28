import { heroes } from '../data/heroes';
import { HeroI } from '../interfaces/Hero.interface';

const findheroeByID = (id: number): HeroI | undefined => {
 return heroes.find(heroe => heroe.id === id)  
}

export {
    findheroeByID,
}