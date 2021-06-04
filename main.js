const sonya = {
  name: 'SONYA',
  hp: '50%',
  img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
  weapon: ['baton', 'pistol'],
  attack: function () {
    console.log(sonya.name + 'Fight...')
  },
}

const serj = {
  name: 'SUB-ZERO',
  hp: '80%',
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['baton', 'dagger'],
  attack: function () {
    console.log(serj.name + 'Fight...')
  },
}

const createPlayer = (player, person) => {
  const $player = document.createElement('div');
  console.log($player);
  $player.classList.add(player);
  const progressBar = document.createElement('div');
  progressBar.classList.add('progressBar');
  const character = document.createElement('div');
  character.classList.add('character');
  $player.appendChild(progressBar);
  $player.appendChild(character);
  const $life = document.createElement('div');
  $life.classList.add('life');
  const $name = document.createElement('div');
  $name.classList.add('name');
  progressBar.appendChild($life);
  progressBar.appendChild($name);
  const img = document.createElement('img');
  character.appendChild(img);
  $life.style.width = person.hp;
  $name.innerText = person.name;
  img.src = person.img;
  const arenas = document.querySelector('.arenas');
  arenas.appendChild($player);
}

createPlayer('player1', sonya);
createPlayer('player2', serj);
