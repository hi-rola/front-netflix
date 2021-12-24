export class Pelicula {
  constructor(
    public id_pelicula: number,
    public titulo: string,
    public descripcion: string,
    public anyo_lanzamiento: number,
    public id_idioma: number,
    public id_idioma_original: number,
    public duracion_alquiler: number,
    public rental_rate: number,
    public duracion: number,
    public replacement_cost: number,
    public clasificacion: number,
    public caracteristicas_especiales: string[],
    public ultima_actualizacion: Date
  ) {}
}
