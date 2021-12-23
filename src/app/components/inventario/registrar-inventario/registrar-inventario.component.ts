import { InventarioService } from './../inventario.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-inventario',
  templateUrl: './registrar-inventario.component.html',
  styleUrls: ['./registrar-inventario.component.css'],
})
export class RegistrarInventarioComponent implements OnInit {
  almacenes: any[] = [];
  peliculas: any[] = [];

  formNuevoInventario = this.fb.group({
    idPelicula: ['', Validators.required],
    idAlmacen: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private inventarioService: InventarioService
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
        .subscribe((result) => {});
    }
  }
}
