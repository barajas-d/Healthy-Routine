import { Injectable } from '@angular/core';
import { User } from '../modelos/usuario'

@Injectable()
export class AuthProvider{
    usuarioActivo = {} as User;
    constructor(){

    }

    Online(){
        return this.usuarioActivo != null;
    }
    Offline(){
        this.usuarioActivo = null;
    }
    esAdmin(){
        return this.usuarioActivo.rol === 0;
    }
}
