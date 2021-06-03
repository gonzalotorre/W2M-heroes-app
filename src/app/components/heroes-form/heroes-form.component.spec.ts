import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Heroe } from 'src/app/model/heroe';

import { HeroesFormComponent } from './heroes-form.component';

describe('HeroesFormComponent', () => {
  let component: HeroesFormComponent;
  let fixture: ComponentFixture<HeroesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
