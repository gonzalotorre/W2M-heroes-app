import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from 'src/app/model/heroe';
import { map } from 'rxjs/operators';
import HeroesJSON from './../../assets/heores.json';

/* Crear una lista con los heroes que se obtienen del JSON. Tambien se podrian obtener
 * mediante HttpCliente con una llamada get.
 */
const HEROES: Heroe[] = HeroesJSON.heroes;

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Devuelve todos los heroes de la lista. Esta lista se obtiene de un archivo JSON.
   * En el caso de haber una API se usaria HttpClient para hacer la llamada get a la API y devolver una lista con
   * los heroes.
   * @returns una lista de heroes que en este caso provienen de un archivo JSON.
   */
  public getHeroes(): Heroe[] {
    return HEROES;
  }

  /**
   * Devuelve todos los heroes de la lista. Esta lista se obtiene de un archivo JSON. En este ejemplo
   * se usa HttpClient para hacer la llamada get al JSON y devolver la lista con los heroes.
   * @returns una lista de heroes que en este caso provienen de un archivo JSON.
   */
   public getHeroesHttp(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>('./../../assets/heores.json');
  }

  /**
   * Obtener un heroe por id que se pasa por parametro.
   * Mediante el metodo filter del array de heroes, se comprueba que exista un heroe con ese id y se devuelve.
   * En caso contrario devuelve undefined.
   * En el caso de haber una API se usaria HttpClient para hacer la llamada get a la API y devolver el heroe.
   * @param heroID id del heroe que se quiere buscar.
   * @returns devuelve el heroe en caso de haberlo encontrado o undefined si no lo encuentra.
   */
  public getHeroById(heroID: number): Heroe | undefined {
    return HEROES.find(heroe => heroe.id === heroID);
  }

  /**
   * Obtener un heroe por id que se pasa por parametro.
   * Mediante HttpClient podemos hacer una llamada a get para hacer obtener la lista de heroes y despues filtrarla por
   * el id de heroe que se pasa por parametros. Usando el operador map de rxjs podemos a??adirle el filtro por la cadena.
   * @param heroID id del heroe que se quiere buscar.
   * @returns devuelve el heroe en caso de haberlo encontrado o undefined si no lo encuentra.
   */
  public getHeroByIdHttp(heroID: number): Observable<Heroe> {
    return this.http.get<Heroe>('./../../assets/heores.json').pipe(
      map((resp: any) => {
        return resp.heroes.find((hero: Heroe) => hero.id === heroID);
      })
    );
  }

  /**
   * Obtener un heroe por una cadena que se pasa por parametro.
   * En el caso de haber una API que hiciera esta funcionalidad se usaria HttpClient para hacer la llamada get a la API
   * y devolver una lista con los heroes que contengan la cadena que se pasa por parametro.
   * @param nameFilter cadena que por la que se busca para obtener el heroe.
   */
  public getHeroesByNameFilter(nameFilter: string): Heroe[] {
    return HEROES.filter(heroe => heroe.name.toUpperCase().includes(nameFilter.toUpperCase()));
  }

  /**
   * Obtener un heroe por una cadena que se pasa por parametro.
   * Mediante HttpClient podemos hacer una llamada get para obtener la lista de heroes y despues filtrar por la cadena
   * que se pasa por par??metros. Usando el operador map de rxjs podemos a??adirle el filtro por la cadena.
   * @param nameFilter cadena que por la que se busca para obtener el heroe.
   */
   public getHeroesByNameFilterHttp(nameFilter: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>('./../../assets/heores.json').pipe(
      map((resp: any) => {
        return resp.heroes.find((hero: Heroe) => hero.name.toUpperCase().includes(nameFilter.toUpperCase()));
      })
    );
  }

  /**
   * A??adir un heroe a la lista.
   * Mediante la funci??n max de la clase Math que devuelve el mayor id del array de heroes y despues se le supa 1.
   * En el caso de haber una API se usaria HttpClient para hacer la llamada post a la API y el id podria ser autogenerado.
   * @param hero heroe que se va a a??adir a la lista.
   */
  public addHero(hero: Heroe) {
    const maxID = Math.max.apply(Math, HEROES.map((heroe) =>  heroe.id ));
    hero.id = maxID + 1;
    HEROES.push(hero);
  }

  /**
   * Editar un heroe de la lista.
   * Se recorre la liste de heroes y se comprueba que exista el heroe que se pasa por parametros en la lista
   * y se modifica por el que viene por parametro.
   * En el caso de haber una API se usaria HttpClient para hacer la llamada put a la API.
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
   * En el caso de haber una API se usaria HttpClient para hacer la llamada delete a la API.
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
