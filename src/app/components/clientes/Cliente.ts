export class Cliente {
  constructor(
    public nombre: string,
    public apellidos: string,
    public email: string,
    public activo: number,
    public fecha_creacion: Date,
    public direccion: string,
    public direccion2: string,
    public distrito: string,
    public id_ciudad: number,
    public codigo_postal: string,
    public telefono: string,
    public id_almacen: number
  ) {}
}
