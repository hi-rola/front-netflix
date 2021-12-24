import { AlquilerService } from './../../../components/alquiler/alquiler.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-msj-eliminar-alquiler',
  templateUrl: './msj-eliminar-alquiler.component.html',
  styleUrls: ['./msj-eliminar-alquiler.component.css'],
})
export class MsjEliminarAlquilerComponent implements OnInit {
  id!: number;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<MsjEliminarAlquilerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alquilerService: AlquilerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }

  eliminarAlquiler() {
    this.alquilerService.deleteAlquiler(this.id).subscribe(
      (result) => {
        this._snackBar.open('Alquiler eliminado exitosamente', '', {
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
