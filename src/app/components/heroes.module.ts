import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Components
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import { HeroesComponent } from './heroes/heroes.component';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { UppercaseDirective } from '../directives/uppercase.directive';



@NgModule({
  declarations: [
    HeroesComponent,
    HeroesFormComponent,
    UppercaseDirective
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
