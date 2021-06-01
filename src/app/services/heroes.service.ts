import { Injectable } from '@angular/core';
import { Heroe } from '../model/heroe';
import HeroesJSON from './../../assets/heores.json'

const HEROES: Heroe[] = HeroesJSON.heroes;

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor() { }

  public getHeroes(): Heroe[] {
    console.log(HEROES);
    console.log(HEROES.length);
    return HEROES;
  }

  public getHeroByName(name: string) {

  }

  public addHero() {

  }

  public editHero() {

  }

  public removeHero(heroID: number) {
    HEROES.forEach(
      (heroe: Heroe, index: number) => {
        if (heroe.id === heroID) {
          HEROES.splice(index, 1);
          console.log('BORRADO');
        }
      }
    );
  }

}
