import { createAction, props } from '@ngrx/store';
import Hunter from '../../models/hunter';

export const iniciarHunter    = createAction('INICIAR_HUNTER', props<{ hunter : Hunter }>() );
export const avanzarPosicion  = createAction('AVANZAR_POSICION');
export const girarIzquierda   = createAction('GIRAR_IZQUIERDA', );
export const girarDerecha     = createAction('GIRAR_DERECHA');
export const dispararFlecha   = createAction('DISPARAR_FLECHA');