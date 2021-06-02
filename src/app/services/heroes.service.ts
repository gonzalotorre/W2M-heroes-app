import { Injectable } from '@angular/core';
import { Heroe } from '../model/heroe';
import HeroesJSON from './../../assets/heores.json';

const HEROES: Heroe[] = HeroesJSON.heroes;

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor() { }

  /**
   * Devuelve todos los heroes de la lista. Esta lista se obtiene de un archivo JSON.
   * En el caso de haber una API se usaria el HttpClient para hacer la llamada a la API y devolver una lista con
   * los heroes.
   * @returns una lista de heroes que en este caso provienen de un archivo JSON.
   */
  public getHeroes(): Heroe[] {
    return HEROES;
  }

  /**
   * Obtener un heroe por id que se pasa por parametro.
   * Mediante el metodo filter del array de heroes, se comprueba que exista un heroe con ese id y se devuelve.
   * En caso contrario devuelve undefined.
   * @param heroID id del heroe que se quiere buscar.
   * @returns devuelve el heroe en caso de haberlo encontrado o undefined si no lo encuentra.
   */
  public getHeroById(heroID: number): Heroe {
    const hero = HEROES.find(heroe => heroe.id === heroID);
    if (hero) {
      return hero;
    } else {
      return new Heroe();
    }
  }

  /**
   * Obtener un heroe por una cadena que se pasa por parametro.
   *
   * @param nameFilter cadena que por la que se busca para obtener el heroe.
   */
  public getHeroByNameFilter(nameFilter: string): Heroe[] {
    return HEROES.filter(heroe => heroe.name.toUpperCase().includes(nameFilter.toUpperCase()));
  }

  /**
   * Añadir un heroe a la lista.
   * Se le asigna el id que es el tamaño de la lista mas uno y se añade a la lista de heroes.
   * @param hero heroe que se va a añadir a la lista.
   */
  public addHero(hero: Heroe) {
    hero.id = HEROES.length + 1;
    HEROES.push(hero);
  }

  /**
   * Editar un heroe de la lista.
   * Se recorre la liste de heroes y se comprueba que exista el heroe que se pasa por parametros en la lista
   * y se modifica por el que viene por parametro.
   * @param hero heroe editado
   */
  public editHero(hero: Heroe) {
    HEROES.forEach(
      (heroe: Heroe) => {
        if (heroe.id === hero.id) {
          heroe = hero;
        }
      }
    );
  }

  /**
   * Eliminar un heroe de la lista.
   * Se recorre la liste de heroes y se comprueba que exista un heroe con el id que se pasa por parametro.
   * En caso de existir se elimina de la lista.
   * @param heroID id del heroe que se quiere eliminar.
   */
  public removeHero(heroID: number) {
    HEROES.forEach(
      (heroe: Heroe, index: number) => {
        if (heroe.id === heroID) {
          HEROES.splice(index, 1);
        }
      }
    );
  }

}
