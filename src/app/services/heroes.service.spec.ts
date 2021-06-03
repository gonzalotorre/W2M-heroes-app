import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';

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

  it('Edit hero should edit the hero by his id', () => {
    const hero = {
      id: 1,
      name: 'Antii-Magee',
      power: 'AntiMage'
    };
    expect(service.editHero(hero)).toBeFalsy(service.getHeroById(1));
  });

  it('Delete hero by id should remove the hero with that id', () => {
    const initialSize = service.getHeroes().length;
    service.removeHero(1);
    const finishSize = service.getHeroes().length;
    expect(finishSize).toEqual(initialSize - 1);
  });

});
