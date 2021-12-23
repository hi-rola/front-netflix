import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InventarioService } from './../inventario.service';
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

@Component({
  selector: 'app-editar-inventario',
  templateUrl: './editar-inventario.component.html',
  styleUrls: ['./editar-inventario.component.css'],
})
export class EditarInventarioComponent implements OnInit {
  almacenes: any[] = [];
  peliculas: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  formActualizarInventario = this.fb.group({
    idPelicula: ['', Validators.required],
    idAlmacen: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditarInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    let id_inventario = this.data.id_inventario;

    this.inventarioService
      .getInventarioById(id_inventario)
      .subscribe((result) => {
        this.formActualizarInventario
          .get('idPelicula')
          ?.setValue(result.id_pelicula);
        this.formActualizarInventario
          .get('idAlmacen')
          ?.setValue(result.id_almacen);
      });

    this.inventarioService.getAlmacen().subscribe((result) => {
      this.almacenes = result;
    });
    this.inventarioService.getPelicula().subscribe((result) => {
      this.peliculas = result;
    });
  }

  get form(): any {
    return this.formActualizarInventario?.controls;
  }

  actualizarInformacion() {
    if (this.formActualizarInventario.valid) {
      this.inventarioService
        .updateInventario(
          this.data.id_inventario,
          this.formActualizarInventario.value
        )
        .subscribe(
          (result) => {
            this._snackBar.open('Información actualizada exitosamente', '', {
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
