import { InventarioService } from './../inventario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-inventario',
  templateUrl: './registrar-inventario.component.html',
  styleUrls: ['./registrar-inventario.component.css'],
})
export class RegistrarInventarioComponent implements OnInit {
  almacenes: any[] = [];
  peliculas: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  formNuevoInventario = this.fb.group({
    idPelicula: ['', Validators.required],
    idAlmacen: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.inventarioService.getAlmacen().subscribe((result) => {
      this.almacenes = result;
    });

    this.inventarioService.getPelicula().subscribe((result) => {
      this.peliculas = result;
    });
  }

  get form(): any {
    return this.formNuevoInventario?.controls;
  }

  crearProyecto() {
    if (this.formNuevoInventario.valid) {
      this.inventarioService
        .saveInventario(this.formNuevoInventario.value)
        .subscribe(
          (result) => {
            this._snackBar.open('Inventario registrado exitosamente', '', {
              duration: 2000,
              panelClass: 'error-alert-snackbar',
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          },
          (error) => {
            this._snackBar.open(
              'Problemas al procesar la solictud, por favor inténtelo más tarde',
              '',
              {
                duration: 2000,
                panelClass: 'error-alert-snackbar',
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              }
            );
          }
        );
    }
  }
}
