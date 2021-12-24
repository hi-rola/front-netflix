import { Cliente } from './../Cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { MsjEliminarComponent } from '../../../shared/mensajes-confirmacion/msj-eliminar/msj-eliminar.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'],
})
export class HomeClienteComponent implements OnInit {
  clientes: any;
  dataSource: any;

  displayedColumns: string[] = [
    'id_cliente',
    'nombre',
    'apellidos',
    'email',
    'activo',
    'fecha_creacion',
    'ultima_actualizacion',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private clienteService: ClienteService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.mostrarClientes();
  }

  mostrarClientes() {
    this.clienteService.getAllCliente().subscribe((result) => {
      this.clientes = result;
      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Clientes por página';
      this.dataSource.paginator._intl.firstPageLabel = 'Inicio';
      this.dataSource.paginator._intl.nextPageLabel = 'Siguiente';
      this.dataSource.paginator._intl.previousPageLabel = 'Anterior';
      this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    });
  }

  eliminarCliente(cliente: any) {
    const dialogRef = this.dialog.open(MsjEliminarComponent, {
      width: '450px',
      data: { name: cliente.apellidos },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clienteService
          .deleteCliente(cliente.id_cliente)
          .subscribe((result) => {
            this.mostrarClientes();
          });
        this._snackBar.open('Cliente eliminado exitosamente', '', {
          duration: 2000,
          panelClass: 'error-alert-snackbar',
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
  }

  editarInformacionCliente(cliente: Cliente) {
    this.router.navigate([
      '/actualizar-informacion-cliente',
      cliente.id_cliente,
    ]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dialogRegistrarTarea() {
    console.log('jaja');
  }
}
