const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: 'SONYA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['baton', 'pistol'],
  attack: function () {
    console.log(player1.name + 'Fight...')
  },
  changeHP,
  elHP,
  renderHP,
}

const player2 = {
  player: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['baton', 'dagger'],
  attack: function () {
    console.log(player2.name + 'Fight...')
  },
  changeHP,
  elHP,
  renderHP,
}

function createElement (tag, className)  {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer (person) {
  const $player = createElement('div', 'player' + person.player);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = person.hp + '%';
  $name.innerText = person.name;
  $img.src = person.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  return $player;
}

function changeHP (num) {
  this.hp -= num;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector('.player'+this.player+' .life');
}

function renderHP() {
  this.elHP().style.width = this.hp + '%';
}

function playerWins (name)  {
  const $winsTitle = createElement('div', 'loseTitle');
  if (name) {
    $winsTitle.innerText = name + ' wins';
  } else {
    $winsTitle.innerText = 'draw';
  }
  return $winsTitle;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
}

function createReloadButton() {
  const $reloadWrap = createElement('div', 'reloadWrap');
  let $button = createElement('button', 'button');
  $button.innerText = 'Restart';
  $arenas.appendChild($reloadWrap);
  $reloadWrap.appendChild($button);
  $button.addEventListener('click', function () {
    window.location.reload();
  })
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  if (attack.defence === enemy.hit) {
    player1.changeHP(0);
  }
  if (attack.hit === enemy.defence) {
    player2.changeHP(0);
  }
  if (attack.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
  }
  if (enemy.defence !== attack.hit) {
    player2.changeHP(attack.value);
  }

  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
})
