import { Alquiler } from './../Alquiler';
import { AlquilerService } from './../alquiler.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-alquiler',
  templateUrl: './editar-alquiler.component.html',
  styleUrls: ['./editar-alquiler.component.css'],
})
export class EditarAlquilerComponent implements OnInit {
  clientes: any[] = [];
  peliculas: any[] = [];
  empleados: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  formEditarAlquiler = this.fb.group({
    id_pelicula: ['', Validators.required],
    fecha_alquiler: ['', Validators.required],
    id_cliente: ['', Validators.required],
    fecha_devolucion: ['', Validators.required],
    id_empleado: ['', Validators.required],
  });

  constructor(
    private alquilerService: AlquilerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mostrarDatosSelect();

    this.alquilerService
      .getAlquilerById(this.data.id_alquiler)
      .subscribe((result) => {
        this.formEditarAlquiler
          .get('fecha_alquiler')
          ?.setValue(result.fecha_alquiler);
        this.formEditarAlquiler.get('id_cliente')?.setValue(result.id_cliente);
        this.formEditarAlquiler
          .get('fecha_devolucion')
          ?.setValue(result.fecha_devolucion);
        this.formEditarAlquiler
          .get('id_empleado')
          ?.setValue(result.id_empleado);
      });

    this.alquilerService
      .getPeliculaByIdInventario(this.data.id_inventario)
      .subscribe((result) => {
        this.formEditarAlquiler
          .get('id_pelicula')
          ?.setValue(result.id_pelicula);
      });
  }

  mostrarDatosSelect() {
    this.alquilerService.getAllPeliculaIdNombre().subscribe((result) => {
      this.peliculas = result;
    });

    this.alquilerService.getAllClienteIdNombre().subscribe((result) => {
      this.clientes = result;
    });

    this.alquilerService.getAllEmpleado().subscribe((result) => {
      this.empleados = result;
    });
  }

  get form(): any {
    return this.formEditarAlquiler?.controls;
  }

  actualizarAlquiler() {
    let fechaAlquiler = moment(
      this.formEditarAlquiler.get('fecha_alquiler')?.value
    ).format('YYYY-MM-DD');

    let fechaDevolucion = moment(
      this.formEditarAlquiler.get('fecha_devolucion')?.value
    ).format('YYYY-MM-DD');

    this.formEditarAlquiler.get('fecha_alquiler')?.setValue(fechaAlquiler);
    this.formEditarAlquiler.get('fecha_devolucion')?.setValue(fechaDevolucion);

    if (this.formEditarAlquiler.valid) {
      this.alquilerService
        .updateAlquiler(this.data.id_alquiler, this.formEditarAlquiler.value)
        .subscribe(
          (result) => {
            this._snackBar.open('Información actualizada exitosamente', '', {
              duration: 2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          },
          (error) => {
            this._snackBar.open(
              'Problemas al registrar el alquiler, por favor inténtelo más tarde',
              '',
              {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              }
            );
          }
        );
    }
  }
}
