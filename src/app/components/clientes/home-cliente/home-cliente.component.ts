import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'],
})
export class HomeClienteComponent implements OnInit {
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getAllCliente().subscribe((result) => {
      console.log(result);
    });
  }

  dialogRegistrarTarea() {
    console.log('jaja');
  }
}
