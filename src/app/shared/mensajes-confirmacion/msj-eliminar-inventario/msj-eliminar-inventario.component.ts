import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msj-eliminar-inventario',
  templateUrl: './msj-eliminar-inventario.component.html',
  styleUrls: ['./msj-eliminar-inventario.component.css'],
})
export class MsjEliminarInventarioComponent implements OnInit {
  id: string = '';
  constructor(
    public dialogRef: MatDialogRef<MsjEliminarInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }
}
