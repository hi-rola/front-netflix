export class Alquiler {
  constructor(
    public id_alquiler: number,
    public fecha_alquiler: Date,
    public id_inventario: number,
    public id_cliente: number,
    public fecha_devolucion: Date,
    public id_empleado: number,
    public ultima_actualizacion: Date
  ) {}
}
