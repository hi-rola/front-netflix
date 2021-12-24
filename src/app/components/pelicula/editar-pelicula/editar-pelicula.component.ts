import { PeliculaService } from 'src/app/components/pelicula/pelicula.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  idiomas: any[] = [];
  id_pelicula!: number;

  formEditarPelicula = this.fb.group({
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
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_pelicula = this.route.snapshot.params['id'];

    this.peliculaService
      .getPeliculaById(this.id_pelicula)
      .subscribe((result) => {
        this.formEditarPelicula.get('titulo')?.setValue(result.titulo);
        this.formEditarPelicula
          .get('descripcion')
          ?.setValue(result.descripcion);
        this.formEditarPelicula
          .get('anyo_lanzamiento')
          ?.setValue(result.anyo_lanzamiento);
        this.formEditarPelicula.get('id_idioma')?.setValue(result.id_idioma);
        this.formEditarPelicula
          .get('duracion_alquiler')
          ?.setValue(result.duracion_alquiler);
        this.formEditarPelicula
          .get('rental_rate')
          ?.setValue(result.rental_rate);
        this.formEditarPelicula.get('duracion')?.setValue(result.duracion);
        this.formEditarPelicula
          .get('replacement_cost')
          ?.setValue(result.replacement_cost);
        this.formEditarPelicula
          .get('clasificacion')
          ?.setValue(result.clasificacion);
        this.formEditarPelicula
          .get('caracteristicas_especiales')
          ?.setValue(result.caracteristicas_especiales);
      });

    this.mostrarDatosIdioma();
  }

  mostrarDatosIdioma() {
    this.peliculaService.getAllIdioma().subscribe((result) => {
      this.idiomas = result;
    });
  }

  get form(): any {
    return this.formEditarPelicula?.controls;
  }

  actualizarInformacion() {
    if (this.formEditarPelicula.valid) {
      this.peliculaService
        .updatePelicula(this.id_pelicula, this.formEditarPelicula.value)
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
              'Problemas al actualizar la información, por favor inténtelo más tarde',
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
