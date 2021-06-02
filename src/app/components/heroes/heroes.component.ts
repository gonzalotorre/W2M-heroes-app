import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Heroe } from 'src/app/model/heroe';
import { HeroesService } from '../../services/heroes.service';
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

  heroes: any[] = [];

  nameFilter = '';

  constructor(
    private heroesService: HeroesService
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
  private getHeroes() {
    this.heroes = this.heroesService.getHeroes();
    this.initializaTable();
  }

  searchByName(event: any) {
    this.nameFilter += event.data;
    if (!event.data) {
      this.nameFilter = '';
    }
  }

  /**
   * Eliminar un heroe de la lista, cuando se hace click sobre el icono en la tabla, mediante la dependencia agregada
   * de SweetAlert2, nos saldrá una ventana modal que nos preguntará si queremos eliminar el registro. En caso de darle
   * al botón de aceptar, se eliminará.z
   */
  removeHero(heroID: number) {
    // Mostrar modal de alerta cuando se va a borrar un registro.
    Swal.fire({
      title: '¿Quieres eliminar este héroe?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesService.removeHero(heroID);
        this.getHeroes();
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
