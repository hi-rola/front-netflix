import { HomeAlquilerComponent } from './components/alquiler/home-alquiler/home-alquiler.component';
import { EditarPeliculaComponent } from './components/pelicula/editar-pelicula/editar-pelicula.component';
import { RegistrarPeliculaComponent } from './components/pelicula/registrar-pelicula/registrar-pelicula.component';
import { EditarClienteComponent } from './components/clientes/editar-cliente/editar-cliente.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeClienteComponent } from './components/clientes/home-cliente/home-cliente.component';
import { RegistrarClienteComponent } from './components/clientes/registrar-cliente/registrar-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { HomeInventarioComponent } from './components/inventario/home-inventario/home-inventario.component';
import { HomePeliculaComponent } from './components/pelicula/home-pelicula/home-pelicula.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: HomeClienteComponent },
  { path: 'registrar-cliente', component: RegistrarClienteComponent },
  {
    path: 'actualizar-informacion-cliente/:id',
    component: EditarClienteComponent,
  },
  { path: 'inventario', component: HomeInventarioComponent },
  { path: 'peliculas', component: HomePeliculaComponent },
  { path: 'registrar-pelicula', component: RegistrarPeliculaComponent },
  {
    path: 'actualizar-informacion-pelicula/:id',
    component: EditarPeliculaComponent,
  },
  { path: 'alquiler', component: HomeAlquilerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
