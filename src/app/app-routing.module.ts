import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroesFormComponent } from './components/heroes-form/heroes-form.component';

const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'heroesForm', component: HeroesFormComponent},
  {path: 'heroesForm/:id', component: HeroesFormComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
