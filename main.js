const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'SONYA',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['baton', 'pistol'],
  attack: function () {
    console.log(player1.name + 'Fight...')
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  createReloadButton();
  const $winsTitle = createElement('div', 'winsTitle');
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

$randomButton.addEventListener('click', function () {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));
  player1.elHP();
  player2.elHP();
  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

