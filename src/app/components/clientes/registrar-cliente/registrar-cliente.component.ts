import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import * as moment from 'moment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css'],
})
export class RegistrarClienteComponent implements OnInit {
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
  });

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clienteService.getAllAlmacen().subscribe((result) => {
      this.almacen = result;
    });

    this.clienteService.getAllCiudad().subscribe((result) => {
      this.ciudad = result;
    });
  }

  get form(): any {
    return this.formNuevoCliente?.controls;
  }

  registrarCliente() {
    let fechaFormateada = moment(
      this.formNuevoCliente.get('fecha_creacion')?.value
    ).format('YYYY-MM-DD');
    this.formNuevoCliente.get('fecha_creacion')?.setValue(fechaFormateada);

    if (this.formNuevoCliente.valid) {
      this.clienteService.saveCliente(this.formNuevoCliente.value).subscribe(
        (result) => {
          this._snackBar.open('Cliente registrado exitosamente', '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        },
        (error) => {
          this._snackBar.open(
            'Problemas al registrar el cliente, por favor int??ntelo m??s tarde',
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
