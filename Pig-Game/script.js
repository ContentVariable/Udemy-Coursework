'use strict';

// ELEMENT VARIABLES
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// INITIAL STATE
// score0El.textContent = 0;
// score1El.textContent = 0;
let playing, scores, currentScore, activePlayer;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
};
init();

// DICE ROLL
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.) GENERATE RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2.) DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.) CHECK FOR ROLLED 1 ? KEEP ROLLING : SWITCH PLAYER
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.) ADD CURRENT SCORE TO ACTIVE PLAYER
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.) CHECK FOR SCORE OF 100
    if (scores[activePlayer] >= 100) {
      // 3a.) FINISH GAME
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3b.) SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
