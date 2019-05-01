import { Ejercicio } from "./ejercicio";
export interface PlanEjercicio{
    nombre:string;
    imagen:string;
    objetivo: string;
    ejercicios: Ejercicio[];
    visible:boolean;
}