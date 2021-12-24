import { Pelicula } from './../Pelicula';
import { MatDialog } from '@angular/material/dialog';
import { MsjEliminarPeliculaComponent } from './../../../shared/mensajes-confirmacion/msj-eliminar-pelicula/msj-eliminar-pelicula.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PeliculaService } from '../pelicula.service';

@Component({
  selector: 'app-home-pelicula',
  templateUrl: './home-pelicula.component.html',
  styleUrls: ['./home-pelicula.component.css'],
})
export class HomePeliculaComponent implements OnInit {
  pelicula: Pelicula[] = [];
  dataSource: any;

  displayedColumns: string[] = [
    'titulo',
    'id_pelicula',
    'descripcion',
    'anyo_lanzamiento',
    'id_idioma',
    'id_idioma_original',
    'duracion_alquiler',
    'rental_rate',
    'duracion',
    'replacement_cost',
    'clasificacion',
    'caracteristicas_especiales',
    'ultima_actualizacion',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private peliculaService: PeliculaService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mostrarPeliculas();
  }

  mostrarPeliculas() {
    this.peliculaService.getAllPelicula().subscribe((result) => {
      this.pelicula = result;
      this.dataSource = new MatTableDataSource(this.pelicula);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel =
        'Películas por página';
      this.dataSource.paginator._intl.firstPageLabel = 'Inicio';
      this.dataSource.paginator._intl.nextPageLabel = 'Siguiente';
      this.dataSource.paginator._intl.previousPageLabel = 'Anterior';
      this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    });
  }

  eliminarPelicula(pelicula: Pelicula) {
    const dialogRef = this.dialog.open(MsjEliminarPeliculaComponent, {
      width: '450px',
      data: { id: pelicula.id_pelicula, titulo: pelicula.titulo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mostrarPeliculas();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
