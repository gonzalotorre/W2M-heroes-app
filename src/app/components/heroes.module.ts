import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeroesRoutingModule } from './heores-routing.module';

// Components
import { HeroesFormComponent } from './heroes-form/heroes-form.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SearchFormComponent } from './search-form/search-form.component';

// Directivas
import { UppercaseDirective } from '../directives/uppercase.directive';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    HeroesComponent,
    HeroesFormComponent,
    UppercaseDirective,
    SearchFormComponent
  ],
  imports: [
    HeroesRoutingModule,
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
