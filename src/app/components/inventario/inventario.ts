export class Inventario {
  constructor(
    public id_inventario: number | null,
    public id_pelicula: number,
    public id_almacen: number,
    public ultima_actualizacion: Date
  ) {}
}
