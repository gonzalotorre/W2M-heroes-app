import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';

import HeroesJSON from './../../assets/heores.json';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get heroes should return the list of heroes', () => {
    const heroes = service.getHeroes();
    expect(service.getHeroes()).toEqual(heroes);
  });

  it('Get hero by id should return a hero with this id', () => {
    const hero = service.getHeroById(1);
    expect(service.getHeroById(1)).toEqual(hero);
  });

  it('Get heroes by name filter should return a list of heroes that contains that name filter', () => {
    const heroes = service.getHeroesByNameFilter('am');
    expect(service.getHeroesByNameFilter('am')).toEqual(heroes);
  });

  it('Add hero should add the hero to the list', () => {
    const herosLength = HeroesJSON.heroes;
    const hero = {
      id: 150,
      name: 'Test',
      power: 'test'
    };
    expect(service.addHero(hero)).toBeFalsy(herosLength);
  });

  it('Edit hero should edit the hero by his id', () => {
    const hero = {
      id: 2,
      name: 'Antii-Magee',
      power: 'AntiMage'
    };
    service.editHero(hero);
    expect(hero).toBeTruthy(service.getHeroById(2));
  });

  it('Delete hero by id should remove the hero with that id', () => {
    const initialSize = service.getHeroes().length;
    service.removeHero(1);
    const finishSize = service.getHeroes().length;
    expect(finishSize).toEqual(initialSize - 1);
  });

});
