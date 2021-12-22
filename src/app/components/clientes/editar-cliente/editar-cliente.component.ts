import { Cliente } from './../Cliente';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../cliente.service';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  private isValidEmail = /\S+@\S+\.\S+/;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ciudad: any[] = [];
  almacen: any[] = [];

  formNuevoCliente = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    activo: ['', Validators.required],
    fecha_creacion: ['', Validators.required],
    direccion: ['', Validators.required],
    direccion2: [''],
    distrito: ['', Validators.required],
    idCiudad: ['', Validators.required],
    codigo_postal: ['', Validators.required],
    telefono: ['', Validators.required],
    idAlmacen: ['', Validators.required],
    id_cliente: [''],
    id_direccion: [''],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let id_cliente = this.route.snapshot.params['id'];

    this.clienteService.getAllAlmacen().subscribe((result) => {
      this.almacen = result;
    });

    this.clienteService.getAllCiudad().subscribe((result) => {
      this.ciudad = result;
    });

    this.clienteService.getClienteById(id_cliente).subscribe((result) => {
      let cliente: Cliente;
      cliente = result;

      this.formNuevoCliente.get('nombre')!.setValue(cliente.nombre);
      this.formNuevoCliente.get('apellidos')!.setValue(cliente.apellidos);
      this.formNuevoCliente.get('email')!.setValue(cliente.email);
      this.formNuevoCliente
        .get('fecha_creacion')!
        .setValue(cliente.fecha_creacion);
      this.formNuevoCliente.get('activo')!.setValue(cliente.activo);

      this.formNuevoCliente.get('idAlmacen')!.setValue(cliente.id_almacen);
      this.formNuevoCliente.get('id_cliente')!.setValue(cliente.id_cliente);
    });

    this.clienteService.getClienteDireccion(id_cliente).subscribe((result) => {
      this.formNuevoCliente
        .get('id_direccion')!
        .setValue(result[0].id_direccion);

      this.formNuevoCliente.get('telefono')!.setValue(result[0].telefono);
      this.formNuevoCliente.get('direccion')!.setValue(result[0].direccion);
      this.formNuevoCliente.get('direccion2')!.setValue(result[0].direccion2);
      this.formNuevoCliente.get('distrito')!.setValue(result[0].distrito);
      this.formNuevoCliente.get('idCiudad')!.setValue(result[0].id_ciudad);
      this.formNuevoCliente
        .get('codigo_postal')!
        .setValue(result[0].codigo_postal);
    });
  }

  get form(): any {
    return this.formNuevoCliente?.controls;
  }

  guardar() {
    let fechaFormateada = moment(
      this.formNuevoCliente.get('fecha_creacion')?.value
    ).format('YYYY-MM-DD');
    this.formNuevoCliente.get('fecha_creacion')?.setValue(fechaFormateada);

    if (this.formNuevoCliente.valid) {
      this.clienteService.updateCliente(this.formNuevoCliente.value).subscribe(
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
