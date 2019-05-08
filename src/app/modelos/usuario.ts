import { Dieta } from "./dieta";
import { PlanEjercicio } from "./planejercicio";

export interface User{
    nombres:string;
    apellidos:string;
    email:string;
    password:string;
    edad: number;
    rol: number;
    peso: number;
    altura: number;
    genero: string;
    estadofisico:string;
    meta:string;
    dietas: Dieta[];
    planes: PlanEjercicio[];
    imc: number;
}