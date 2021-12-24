import { PeliculaService } from 'src/app/components/pelicula/pelicula.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-pelicula',
  templateUrl: './registrar-pelicula.component.html',
  styleUrls: ['./registrar-pelicula.component.css'],
})
export class RegistrarPeliculaComponent implements OnInit {
  idiomas: any[] = [];

  formNuevaPelicula = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    anyo_lanzamiento: ['', Validators.required],
    id_idioma: ['', Validators.required],
    duracion_alquiler: ['', Validators.required],
    rental_rate: ['', Validators.required],
    duracion: ['', Validators.required],
    replacement_cost: ['', Validators.required],
    clasificacion: ['', Validators.required],
    caracteristicas_especiales: ['', Validators.required],
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    private peliculaService: PeliculaService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.peliculaService.getAllIdioma().subscribe((result) => {
      this.idiomas = result;
    });
  }

  get form(): any {
    return this.formNuevaPelicula?.controls;
  }

  guardar() {
    if (this.formNuevaPelicula.valid) {
      this.peliculaService.savePelicula(this.formNuevaPelicula.value).subscribe(
        (result) => {
          this._snackBar.open('Película registrada exitosamente', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },

        (error) => {
          this._snackBar.open(
            'Problemas al registrar el cliente, por favor inténtelo más tarde',
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
