import { RegistrarAlquilerComponent } from './../registrar-alquiler/registrar-alquiler.component';
import { MsjEliminarAlquilerComponent } from './../../../shared/mensajes-confirmacion/msj-eliminar-alquiler/msj-eliminar-alquiler.component';
import { Alquiler } from './../Alquiler';
import { AlquilerService } from './../alquiler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarAlquilerComponent } from '../editar-alquiler/editar-alquiler.component';

@Component({
  selector: 'app-home-alquiler',
  templateUrl: './home-alquiler.component.html',
  styleUrls: ['./home-alquiler.component.css'],
})
export class HomeAlquilerComponent implements OnInit {
  alquiler: any[] = [];
  dataSource: any;

  displayedColumns: string[] = [
    'id_alquiler',
    'fecha_alquiler',
    'id_inventario',
    'id_cliente',
    'fecha_devolucion',
    'id_empleado',
    'ultima_actualizacion',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private alquilerService: AlquilerService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mostrarAlquiler();
  }

  mostrarAlquiler() {
    this.alquilerService.getAllAlquiler().subscribe((result) => {
      this.alquiler = result;
      this.dataSource = new MatTableDataSource(this.alquiler);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.dataSource.paginator._intl.firstPageLabel = 'Inicio';
      this.dataSource.paginator._intl.nextPageLabel = 'Siguiente';
      this.dataSource.paginator._intl.previousPageLabel = 'Anterior';
      this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    });
  }

  eliminarAlquiler(alquiler: Alquiler) {
    const dialogRef = this.dialog.open(MsjEliminarAlquilerComponent, {
      width: '450px',
      data: { id: alquiler.id_alquiler },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mostrarAlquiler();
      }
    });
  }

  mostrarDialogCreateAlquiler() {
    const dialogRef = this.dialog.open(RegistrarAlquilerComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
        this.mostrarAlquiler();
      }
    });
  }

  mostrarDialogUpdateAlquiler(alquiler: Alquiler) {
    const dialogRef = this.dialog.open(EditarAlquilerComponent, {
      width: '600px',
      data: {
        id_alquiler: alquiler.id_alquiler,
        id_inventario: alquiler.id_inventario,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
        this.mostrarAlquiler();
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
