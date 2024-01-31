export interface Iviaje {
    id?: string;
    lugarinicio : string;
    capacidad: number;
    precio : string;
    destino : string;
    horasalida : string;
    idconductor: string;
    asientosdisponibles?: number;
    //solicitudes?: SolicitudViaje[];
}
