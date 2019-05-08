import { Plato } from "./plato";

export interface Dieta{
    nombre:string;
    imagen:string;
    objetivo: string;
    platos: Plato[];
    visible:boolean;
    vecesSeleccionada:number;
    duracion:number;
    descripcion:string;
}