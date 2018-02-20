//check the users answer to see if letter in word
function answerCheck(letter, word){
  if(word.indexOf(letter) != -1){
    return true;
  }
  else{
    return false;
  }
}
//Export the function to be used by hangman.js
module.exports = answerCheck;
