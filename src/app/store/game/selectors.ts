import AppState from '../../models/appstate';
import Game from 'src/app/models/game';
import Board from 'src/app/models/board';

export const selectGame = (state : AppState) : Game => state.game;

export const selectGameBoard = (state : AppState) : Board => selectGame(state).board;