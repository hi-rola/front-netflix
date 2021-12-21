import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msj-eliminar',
  templateUrl: './msj-eliminar.component.html',
  styleUrls: ['./msj-eliminar.component.css'],
})
export class MsjEliminarComponent implements OnInit {
  name: string = '';
  constructor(
    public dialogRef: MatDialogRef<MsjEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.name = this.data.name;
  }
}
