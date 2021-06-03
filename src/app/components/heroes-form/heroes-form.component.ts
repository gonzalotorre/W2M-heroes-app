import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from 'src/app/model/heroe';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.css']
})
export class HeroesFormComponent implements OnInit {

  herosForm: FormGroup;

  heroe: Heroe = new Heroe();

  heroeID: number;

  constructor(
    private heroesService: HeroesService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Se crea el formulario reactivo de angular.
    this.createForm();
    // Se comprueba que venga el id del heroe en la ruta para editarlo.
    this.getParamId();
    // Se comprueba si el id del heroe no es undefined para editar el heroe.
    if (this.heroeID) {
      this.heroe = this.heroesService.getHeroById(this.heroeID);
      // Se carga el formulario con los valores del heroe a editar.
      this.loadForm();
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

  /**
   * Metodo submit del formulario. Se comprueba que el formulario sea valido y depues que la accion sea la de editar
   * o crear un heroe. Una vez realizada la llamada al metodo correspondiente se redirige al listado de heroes.
   */
  onSubmit() {
    if (this.herosForm.valid) {
      if (this.heroeID) {
        this.assignHeroEditValues();
        this.heroesService.editHero(this.heroe);
      } else {
        this.heroe = this.herosForm.value;
        console.log(this.heroe);
        this.heroesService.addHero(this.heroe);
      }
      this.router.navigateByUrl('/heroes');
    }
  }

  /**
   * Cuando se hace el submit del formulario se llama a este metodo que asigna los valores del formulario
   * a los campos correspondientes del heroe. Esto se hace asi para evitar la asignacion directa del
   * formulario con el modelo y no perder el id del heroe. Otra opcion seria incluir el id del heroe en el
   * formulario.
   */
  assignHeroEditValues() {
    this.heroe.name = this.herosForm.value.name;
    this.heroe.power = this.herosForm.value.power;
  }

  /**
   * Metodo que crea el formulario con los campos y con las validaciones necesarias usando formularios
   * reactivos de angular.
   */
  createForm() {
    this.herosForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      power: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * Metodo que inicializa el formulario con los valores del heroe que se quiere editar.
   */
  loadForm() {
    this.herosForm.reset({
      name: this.heroe.name.toUpperCase(),
      power: this.heroe.power
    });
  }

}
