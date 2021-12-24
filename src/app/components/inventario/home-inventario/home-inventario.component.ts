import { EditarInventarioComponent } from './../editar-inventario/editar-inventario.component';
import { InventarioService } from './../inventario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MsjEliminarInventarioComponent } from './../../../shared/mensajes-confirmacion/msj-eliminar-inventario/msj-eliminar-inventario.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Inventario } from '../inventario';
import { RegistrarInventarioComponent } from '../registrar-inventario/registrar-inventario.component';

@Component({
  selector: 'app-home-inventario',
  templateUrl: './home-inventario.component.html',
  styleUrls: ['./home-inventario.component.css'],
})
export class HomeInventarioComponent implements OnInit {
  inventario: Inventario[] = [];
  dataSource: any;

  displayedColumns: string[] = [
    'id_inventario',
    'id_pelicula',
    'id_almacen',
    'ultima_actualizacion',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private inventarioService: InventarioService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarInventario();
  }

  mostrarInventario() {
    this.inventarioService.getAllInventario().subscribe((result) => {
      this.inventario = result;
      this.dataSource = new MatTableDataSource(this.inventario);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.dataSource.paginator._intl.firstPageLabel = 'Inicio';
      this.dataSource.paginator._intl.nextPageLabel = 'Siguiente';
      this.dataSource.paginator._intl.previousPageLabel = 'Anterior';
      this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    });
  }

  eliminarInventario(inventario: Inventario) {
    const dialogRef = this.dialog.open(MsjEliminarInventarioComponent, {
      width: '450px',
      data: { id: inventario.id_inventario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inventarioService
          .deleteInventario(inventario)
          .subscribe((result) => {
            this.mostrarInventario();
          });
        this._snackBar.open('Inventario eliminado exitosamente', '', {
          duration: 1500,
          panelClass: 'error-alert-snackbar',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
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

  mostrarDialogCreateInventario() {
    const dialogRef = this.dialog.open(RegistrarInventarioComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
        this.mostrarInventario();
      }
    });
  }

  mostrarDialogUpdateProject(inventario: Inventario) {
    const dialogRef = this.dialog.open(EditarInventarioComponent, {
      width: '600px',
      data: { id_inventario: inventario.id_inventario },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
        this.mostrarInventario();
      }
    });
  }
}
