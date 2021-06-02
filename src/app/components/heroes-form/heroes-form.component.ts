import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from 'src/app/model/heroe';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.css']
})
export class HeroesFormComponent implements OnInit {

  heroe: Heroe = new Heroe();

  heroeID: number;

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getParamId();
    // Se comprueba si el id del heroe no es undefined para editar el heroe.
    if (this.heroeID) {
      this.heroe = this.heroesService.getHeroById(this.heroeID);
    }
  }

  /**
   * Obtener el id del heroe en caso de que venga en la ruta. En el caso de que no venga devolverá NaN
   * debido a la conversión a numero.
   */
  getParamId() {
    this.activateRoute.params.subscribe(
      params => this.heroeID = Number(params.id)
    );
  }

  onSubmit() {
    if (this.heroeID) {
      this.heroesService.editHero(this.heroe);
    } else {
      this.heroesService.addHero(this.heroe);
    }
    this.router.navigateByUrl('/heroes');
  }

  discardChanges() {
    this.router.navigateByUrl('/heroes');
  }

}
