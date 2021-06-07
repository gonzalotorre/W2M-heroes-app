import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from 'src/app/model/heroe';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() heroesEmitter = new EventEmitter();
  nameFilter = '';

  constructor(
    public heroesService: HeroesService
    ) { }

  ngOnInit(): void {
  }

  /**
   * Metodo que busca en la lista de heroes la cadena que se escriba en el input. Cuando se escribe se llama
   * al evento ngModelChange para detectar cambios en el input, el onchange hace la llamada a este metodo el cual
   * se encarga de llamar al metodo del servicio que busca los heroes con la cadena que se pasa por parametros.
   * Para esto se usa la directiva ngModel del campo nameFilter definido en la clase.
   */
   searchByName() {
    const heroes = this.heroesService.getHeroesByNameFilter(this.nameFilter);
    // Mediante el emitter podemos enviar los resultados de la búsqueda al componente padre.
    this.heroesEmitter.emit(heroes);
  }

  /**
   * Metodo que busca en la lista de heroes la cadena que se escriba en el input. Cuando se escribe se llama
   * al evento ngModelChange para detectar cambios en el input, el onchange hace la llamada a este metodo el cual
   * se encarga de llamar al metodo del servicio que busca los heroes con la cadena que se pasa por parametros.
   * Para esto se usa la directiva ngModel del campo nameFilter definido en la clase.
   */
   searchByNameHttp() {
    this.heroesService.getHeroesByNameFilterHttp(this.nameFilter).subscribe(
      (resp: Heroe[]) => {
        this.heroesEmitter.emit(resp);
      }
    );
  }


}
