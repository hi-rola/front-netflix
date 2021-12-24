import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeliculaService } from 'src/app/components/pelicula/pelicula.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-msj-eliminar-pelicula',
  templateUrl: './msj-eliminar-pelicula.component.html',
  styleUrls: ['./msj-eliminar-pelicula.component.css'],
})
export class MsjEliminarPeliculaComponent implements OnInit {
  titulo: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public dialogRef: MatDialogRef<MsjEliminarPeliculaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private peliculaService: PeliculaService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.titulo = this.data.titulo;
  }

  deletePelicula() {
    this.peliculaService.deletePelicula(this.data.id).subscribe(
      (result) => {
        this._snackBar.open('Película eliminada exitosamente', '', {
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
