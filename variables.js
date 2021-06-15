import { changeHP, elHP, renderHP } from './hp.js';

export const $arenas = document.querySelector('.arenas');
export const $randomButton = document.querySelector('.button');
export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');

export const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
export const ATTACK = ['head', 'body', 'foot'];

export const player1 = {
  player: 1,
  name: 'SONYA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['baton', 'pistol'],
  attack: function () {
    console.log(name + 'Fight...')
  },
  changeHP,
  elHP,
  renderHP,
}

export const player2 = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['baton', 'dagger'],
  attack: function () {
    console.log(namePlayer2 + 'Fight...')
  },
  changeHP,
  elHP,
  renderHP,
}

export const { name, hp } = player1;
export const { name: namePlayer2, hp: hpPlayer2 } = player2;
