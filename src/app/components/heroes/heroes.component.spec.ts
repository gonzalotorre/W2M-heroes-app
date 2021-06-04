import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { AppComponent } from '../../app.component';
import { UppercaseDirective } from '../../directives/uppercase.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import HeroesJSON from './../../../assets/heores.json';


describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeroesComponent,
        UppercaseDirective
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate datasource', () => {
    expect(component.dataSource).not.toBeNull();
  });

  it('should create heroes service', () => {
    expect(component.heroesService).toBeTruthy();
  });

  it('should have a list of Heroes', () => {
    expect(component.heroes).toBeTruthy();
  });

  it('should return a list of heroes', () => {
    const heroes = component.getHeroes();
    expect(component.getHeroes()).toEqual(heroes);
  });

  it('should romeve a hero by id', () => {
    component.removeHero(1);
    expect(component.heroes.length).toEqual(HeroesJSON.heroes.length);
  });

});
