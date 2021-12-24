import { AlquilerService } from './../alquiler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-registrar-alquiler',
  templateUrl: './registrar-alquiler.component.html',
  styleUrls: ['./registrar-alquiler.component.css'],
})
export class RegistrarAlquilerComponent implements OnInit {
  clientes: any[] = [];
  peliculas: any[] = [];
  empleados: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  formNuevoAlquiler = this.fb.group({
    id_pelicula: ['', Validators.required],
    fecha_alquiler: ['', Validators.required],
    id_cliente: ['', Validators.required],
    fecha_devolucion: ['', Validators.required],
    id_empleado: ['', Validators.required],
  });

  constructor(
    private alquilerService: AlquilerService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
    return this.formNuevoAlquiler?.controls;
  }

  guardarAlquiler() {
    let fechaAlquiler = moment(
      this.formNuevoAlquiler.get('fecha_alquiler')?.value
    ).format('YYYY-MM-DD');

    let fechaDevolucion = moment(
      this.formNuevoAlquiler.get('fecha_devolucion')?.value
    ).format('YYYY-MM-DD');

    this.formNuevoAlquiler.get('fecha_alquiler')?.setValue(fechaAlquiler);
    this.formNuevoAlquiler.get('fecha_devolucion')?.setValue(fechaDevolucion);

    if (this.formNuevoAlquiler.valid) {
      this.alquilerService.saveAlquiler(this.formNuevoAlquiler.value).subscribe(
        (result) => {
          this._snackBar.open('Alquiler registrado exitosamente', '', {
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
