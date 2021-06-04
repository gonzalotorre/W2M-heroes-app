import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from 'src/app/model/heroe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Heroe>;

  heroes: Heroe[] = [];

  nameFilter = '';

  constructor(
    public heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngAfterViewInit(): void {
    this.AssignSortingAndPagging();
  }

  /**
   * Obtener los heroes a traves del servicio.
   * Cuando se obtiene la respuesta, se asigna a la lista de heroes y se inicializa la tabla con ellos.
   */
  public getHeroes() {
    this.heroes = this.heroesService.getHeroes();
    this.initializaTable();
  }

  /**
   * Metodo que busca en la lista de heroes la cadena que se escriba en el input. Cuando se escribe se llama
   * al evento ngModelChange para detectar cambios en el input, el onchange hace la llamada a este metodo el cual
   * se encarga de llamar al metodo del servicio que busca los heroes con la cadena que se pasa por parametros.
   * Para esto se usa la directiva ngModel del campo nameFilter definido en la clase.
   */
  searchByName() {
    this.heroes = this.heroesService.getHeroesByNameFilter(this.nameFilter);
    // Reiniciar la tabla cada vez que se busque por una cadena determinada.
    this.initializaTable();
  }

  /**
   * Eliminar un heroe de la lista, cuando se hace click sobre el icono en la tabla, mediante la dependencia agregada
   * de SweetAlert2, nos saldrá una ventana modal que nos preguntará si queremos eliminar el registro. En caso de darle
   * al botón de aceptar, se eliminará.
   */
  removeHero(heroID: number, nameHero: string) {
    // Mostrar modal de alerta cuando se va a borrar un registro.
    Swal.fire({
      title: '¿Quieres eliminar al héroe ' + nameHero + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar el heroe y actualizar la lista.
        this.heroesService.removeHero(heroID);
        this.initializaTable();
      }
    });
  }

  /**
   * Metodo que inicializa la tabla y le asiga los valores que devuelve la peticion.
   * Se inicializa cuando obtenemos los resultados de la peticion porque sino se carga primero la tabla y no mostraria los resultados.
   */
  private initializaTable() {
    // Inicializar la cabecera de la tabla.
    this.displayedColumns  = ['id', 'name', 'power', 'options'];
    // Inicializar la tabla con la lista de heroes que devuelve la peticion.
    this.dataSource = new MatTableDataSource<Heroe>(this.heroes);
    this.AssignSortingAndPagging();
  }

  /**
   * Asignar la paginacion y la ordenacion a la tabla.
   */
  private AssignSortingAndPagging() {
    // Asignar la ordenacion a la tabla.
    this.dataSource.sort = this.sort;
    // Asignar la paginacion a la tabla.
    this.dataSource.paginator = this.paginator;
  }
}
