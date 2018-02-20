// Link in the Inquirer Package
var inquirer = require('inquirer');\
// Link the list of random words
var wordList = require('./word.js');
// Link in the letters to display
var letterDisplay = require('./letter.js');
// Link in the word tester
var answerCheck = require('./answerCheck.js');

//Global
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var lettersAlreadyGuessed = [];
var lettersCorrectlyGuessed = [];
var displayHangman;

//the game object
var game = {

  wordBank : wordList, // import a list of words
  guessesRemaining : 10, // per word
  currentWord : null, // the word object


  startGame : function(){
    // make sure the user has 10 guesses
    this.guessesRemaining = 10;

    // get a random word from the array
    var j = Math.floor(Math.random() * this.wordBank.length);
    this.currentWord = this.wordBank[j];

    // Inform User game has begun
    console.log('You ready?!?!?!?! Cause it is about to get tough!!');

    // Show the empty letters ( _ _ _ _ ) and guesses, etc.
    displayHangman = new lettersToDisplay(this.currentWord);
    displayHangman.parseDisplay();
    console.log('Guesses Left: ' + game.guessesRemaining);

    // prompt for a letter
    promptUser();
  }

};



// Prompt User Function

function promptUser(){

  console.log('');

  // Guesses remaining then prompt for new letter
  if(game.guessesRemaining > 0){
    inquirer.prompt([
      {
        type: "value",
        name: "letter",
        message: "Guess a Letter: "
      }
    ]).then(function(userInput){

      // Collect letter input form the user
      var inputLetter = userInput.letter.toLowerCase();

      // determine if able to use
      if(alphabet.indexOf(inputLetter) == -1){

        // Tell user they did not guess a letter
        console.log('Wrong!!, "' + inputLetter + '" is not an option... Guess again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        promptUser();

      }
      else if(alphabet.indexOf(inputLetter) != -1 && lettersAlreadyGuessed.indexOf(inputLetter) != -1){

        // promt user already guessed that letter
        console.log('You have already guessed "' + inputLetter + '". Try again!');
        console.log('Guesses Left: ' + game.guessesRemaining);
        console.log('Letters already guessed: ' + lettersAlreadyGuessed);
        promptUser();

      }
      else{

        // Remove guessed letter
        lettersAlreadyGuessed.push(inputLetter);

        // Check word for ltter
        var letterInWord = letterDisplay(inputLetter, game.currentWord);

        // If the letter is in the word, update the letter object
        if(letterInWord){

          // Add correct letters
          lettersCorrectlyGuessed.push(inputLetter);

          // blanks for letters
          displayHangman = new lettersToDisplay(game.currentWord, lettersCorrectlyGuessed);
          displayHangman.parseDisplay();


          // Test if the user has won
          if(displayHangman.winner){
            console.log('You win! Congrats!');
            return;
          }
          else{
            console.log('Guesses Left: ' + game.guessesRemaining);
            console.log('Letters already guessed: ' + lettersAlreadyGuessed);
            promptUser();
          }
        }
        else{
          game.guessesRemaining--;

          displayHangman.parseDisplay();
          console.log('Guesses Left: ' + game.guessesRemaining);
          console.log('Letters already guessed: ' + lettersAlreadyGuessed);
          promptUser();
        }

      }

    });

  }
  // Zero guesses remaining then user losses
  else{
    console.log('Sometimes it just sucks to suck.');
    console.log('The word was "' + game.currentWord + '".');
  }

}


// Create a new game
game.startGame();
