import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MaterialDesignModule } from './models/md.module';

import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localEs, 'es');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HomeClienteComponent } from './components/clientes/home-cliente/home-cliente.component';
import { MsjEliminarComponent } from './shared/mensajes-confirmacion/msj-eliminar/msj-eliminar.component';
import { RegistrarClienteComponent } from './components/clientes/registrar-cliente/registrar-cliente.component';
import { EditarClienteComponent } from './components/clientes/editar-cliente/editar-cliente.component';
import { HomeInventarioComponent } from './components/inventario/home-inventario/home-inventario.component';
import { MsjEliminarInventarioComponent } from './shared/mensajes-confirmacion/msj-eliminar-inventario/msj-eliminar-inventario.component';
import { RegistrarInventarioComponent } from './components/inventario/registrar-inventario/registrar-inventario.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    HomeClienteComponent,
    MsjEliminarComponent,
    RegistrarClienteComponent,
    EditarClienteComponent,
    HomeInventarioComponent,
    MsjEliminarInventarioComponent,
    RegistrarInventarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    HttpClientModule,
  ],
  entryComponents: [
    MsjEliminarComponent,
    MsjEliminarInventarioComponent,
    RegistrarInventarioComponent,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
