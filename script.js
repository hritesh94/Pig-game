'use strict';

//Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0'); //we are selecting id so we have used #
const score1EL = document.getElementById('score--1'); // here we are just passing the element name so we dont need # ,it is supposed to be faster than querySelector
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let scores, currentScore, activePlayer, playing; // yeh wala isiliye initialize kiye kyunki isko global scope mai rakhenge tabhi kaam karega
const initialize = function () {
  scores = [0, 0]; //these are the scores which we will use to judge if the player has won or not and also it gets added only when the player clicks on hold button
  currentScore = 0;
  activePlayer = 0;
  playing = true; // we will use this variable to depict the state of the variable so that when no one won has won then the code should keep on working otherwise if any has won then it will go into state where everythings stops and you have to reset the game

  //yeh sab 👇pehle si global scope pe defined isiliye dubara line no17 ki tarah karne ki jarurat nhi
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  diceEL.classList.add('hidden'); //starting mai dice hidden rhena chahiye
};
initialize(); //call karne par initial conditions set hoga
/** yeh actually starting condition tha but baad me usko refactor karne ke liye upar init function mai ghusa diye yeh 👇 ssab starting conditions code
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden'); //starting mai dice hidden rhena chahiye

const scores = [0, 0]; //these are the scores which we will use to judge if the player has won or not and also it gets added only when the player clicks on hold button
let currentScore = 0;
let activePlayer = 0;
let playing = true; // we will use this variable to depict the state of the variable so that when no one won has won then the code should keep on working otherwise if any has won then it will go into state where everythings stops and you have to reset the game
*/

//here this function was added later actually it copied from roll button function and we have done it to avoid the WET principle
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //currentScore drops to zero when 1 comes
  activePlayer = activePlayer === 0 ? 1 : 0; //here we are changing the player
  currentScore = 0;
  player0EL.classList.toggle('player--active'); //here what we are doing is that if the player has class player--active then toggle method will remove otherwise it will add it
  player1EL.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //if its true then only the follwing code works

    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`; // now we can dynamically get the dice images according to the dice number
    console.log(dice);
    //3.Check for rolled 1 : if true, switch to next player
    if (dice !== 1) {
      //Add dice to the current score
      currentScore += dice;
      //current0EL.textContent = currentScore; //this was for reference so that if players score are being added or not
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //now we can dynamically change player
    } else {
      //Switch to next player
      /*Here below this whole chunk of code is needed again while clicking of hold button but we dont want to violate the DRY principle so we will convert this in a function and will call it here(roll) and there(hold) both places
    document.getElementById(`current--${activePlayer}`).textContent = 0; //currentScore drops to zero when 1 comes
    activePlayer = activePlayer === 0 ? 1 : 0; //here we are changing the player
    currentScore = 0;
    player0EL.classList.toggle('player--active'); //here what we are doing is that if the player has class player--active then toggle method will remove otherwise it will add it
    player1EL.classList.toggle('player--active');
    */
      switchPlayer(); //👆 the above part is converted into the function and we are calling it
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to active player's score
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore; So here the current player can be player 0 or 1 but it was changed in roll dice event so the changed player is stored in the global variable activePlayer so this is why we are using it

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //here we want to show the total accumulated score of the current player on the web
    //2.Check if player's score is >= 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false; // as the player has won now the state will be changed leading to disabling of hold and roll to indicate that game has been finished
      diceEL.classList.add('hidden'); //remove dice to indicate game has been finished
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //when player wins add the class which depict player has won
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//Resetting the game
btnNew.addEventListener('click', initialize);
