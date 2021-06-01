import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Heroes from './../../assets/heores.json';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  url = './../../assets/heores.json'

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<any> {
    console.log(this.url);
    return this.http.get(`${this.url}`);
  }

}
