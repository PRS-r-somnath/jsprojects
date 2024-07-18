const words = [
  { word: 'OCTOPUS', hint: 'A marine animal with eight tentacles.' },
  { word: 'PEACOCK', hint: 'A bird known for its colorful and elaborate tail feathers.' },
  { word: 'CHEETAH', hint: 'The fastest land animal.' },
  { word: 'ELEPHANT', hint: 'A large mammal with a trunk.' },
  { word: 'HANGMAN', hint: 'The name of this game.' }
];

let selectedWordObj = words[Math.floor(Math.random() * words.length)];
let selectedWord = selectedWordObj.word;
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const hangmanStages = [
  `

   ------
   |    |
   |
   |
   |
   |
  ------
  `,
  `

   ------
   |    |
   |    O
   |
   |
   |
  ------
  `,
  `

   ------
   |    |
   |    O
   |    |
   |
   |
  ------
  `,
  `

   ------
   |    |
   |    O
   |   /|
   |
   |
  ------
  `,
  `

   ------
   |    |
   |    O
   |   /|\\
   |
   |
  ------
  `,
  `

   ------
   |    |
   |    O
   |   /|\\
   |   /
   |
  ------
  `,
  `

   ------
   |    |
   |    O
   |   /|\\
   |   / \\
   |
  ------
  `
];

function displayWord() {
  const wordElement = document.getElementById('word');
  wordElement.innerHTML = selectedWord.split('').map(letter => (guessedLetters.indexOf(letter) >= 0 ? letter : '_')).join(' ');
}

function displayMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.innerText = message;
}

function displayHangman() {
  const hangmanElement = document.getElementById('hangman');
  hangmanElement.innerText = hangmanStages[mistakes];
}

function displayUsedLetters() {
  const lettersElement = document.getElementById('letters');
  lettersElement.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const button = document.createElement('button');
      button.innerText = letter;
      button.disabled = guessedLetters.indexOf(letter) >= 0;
      button.onclick = () => handleGuess(letter);
      lettersElement.appendChild(button);
  }
}

function handleGuess(letter) {
  if (guessedLetters.indexOf(letter) === -1) {
      guessedLetters.push(letter);
      if (selectedWord.indexOf(letter) === -1) {
          mistakes++;
      }
  }
  displayWord();
  displayHangman();
  displayUsedLetters();
  updateIncorrectGuesses();
  checkGameStatus();
}

function updateIncorrectGuesses() {
  const incorrectGuessesElement = document.getElementById('incorrect-guesses');
  incorrectGuessesElement.innerText = `Incorrect guesses: ${mistakes} / ${maxMistakes}`;
}

function checkGameStatus() {
  if (mistakes === maxMistakes) {
      displayMessage('Game Over! The word was ' + selectedWord);
      disableAllButtons();
  } else if (selectedWord.split('').every(letter => guessedLetters.indexOf(letter) >= 0)) {
      displayMessage('Congratulations! You guessed the word!');
      disableAllButtons();
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll('#letters button');
  buttons.forEach(button => button.disabled = true);
}

function displayHint() {
  const hintElement = document.getElementById('hint');
  hintElement.innerText = 'Hint: ' + selectedWordObj.hint;
}

document.addEventListener('DOMContentLoaded', () => {
  displayWord();
  displayHangman();
  displayUsedLetters();
  updateIncorrectGuesses();
  displayHint();
  displayMessage('Guess the word!');
});
