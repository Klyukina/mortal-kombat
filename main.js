import { getRandom, createElement } from './utils.js'
import { logs } from './logs.js';
import { playerWins } from './wins.js';
import { enemyAttack, playerAttack } from './attacks.js';
import { $arenas, hpPlayer2, hp, $randomButton, namePlayer2, player1,
  player2, name, $chat, $formFight } from './variables.js';


const createPlayer = (person) => {
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

const createReloadButton = () => {
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

const showResult = () => {
  if (hp === 0 || hpPlayer2 === 0) {
    $randomButton.disabled = true;
    createReloadButton();
  }
  if (hp === 0 && hp < hpPlayer2) {
    $arenas.appendChild(playerWins(namePlayer2));
    generateLogs('end', player2, player1);
  } else if (hpPlayer2 === 0 && hpPlayer2 < hp) {
    $arenas.appendChild(playerWins(name));
    generateLogs('end', player1, player2);
  } else if (hp === 0 && hpPlayer2 === 0) {
    $arenas.appendChild(playerWins());
    generateLogs('draw');
  }
}

const generateLogs = (type, player1, player2, hp) => {
  let text = '';
  let el = '';
  let num = logs[type].length-1;
  const date = new Date();
  const time = date.getHours() + ':' + date.getMinutes();

  switch (type) {
    case 'start':
      text = logs[type]
        .replace('[time]', time)
        .replace('[player1]', name)
        .replace('[player2]', namePlayer2)
      el = `<p>${text}</p>`
      break;
    case 'hit':
      text = logs[type][getRandom(num)]
        .replace('[playerKick]', name)
        .replace('[playerDefence]', namePlayer2);
      el = `<p>${time} - ${text} -${hp} [${hpPlayer2}/100]</p>`
      break;
    case 'defence':
      text = logs[type][getRandom(num)]
        .replace('[playerKick]', name)
        .replace('[playerDefence]', namePlayer2);
      el = `<p>${time} - ${text} [${hpPlayer2}/100]</p>`
      break;
    case 'draw':
      text = logs[type];
      el = `<p>${time} - ${text}</p>`
      break;
    case 'end':
      text = logs[type][getRandom(num)]
        .replace('[playerWins]', name)
        .replace('[playerLose]', namePlayer2);
      el = `<p>${time} - ${text}</p>`
      break;
  }
  $chat.insertAdjacentHTML('afterbegin', el);
}

window.addEventListener('load', function () {
  generateLogs('start', player1, player2);
})

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs('hit', player2, player1, enemy.value);
  } else {
    generateLogs('defence', player2, player1);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs('hit', player1, player2, player.value);
  } else {
    generateLogs('defence', player1, player2);
  }

  showResult();
})

