import CARDS from './cards.js';

export default class Train {
  constructor(train) {
    this.train = train;
  }

  createTrain(category) {
    let keyValue = '<div class="rating none"></div>';
    this.train.insertAdjacentHTML('beforeend', keyValue);
    CARDS[category].forEach((key, index) => {
      console.log(category);
      let card = CARDS[1][index];
      let link = './assets/';
      let word = '';
      let translation = '';

      for (let keyCard in card) {
        if (keyCard == 'image') {
          link += card[keyCard];
        }
        if (keyCard == 'word') {
          word = card[keyCard];
        }
        if (keyCard == 'translation') {
          translation = card[keyCard];
        }
      }
      keyValue = `<div class="card-container"><div class="card"><div class="front" style="background-image: url(${link});"><div class="card-header">${word}</div></div><div class="back" style="background-image: url(${link}"><div class="card-header">${translation}</div></div><div class="rotate"></div></div></div>`;
      this.train.insertAdjacentHTML('beforeend', keyValue);
    });
    keyValue = '<div class="btns"><button class="btn none">Start game</button></div>';
    this.train.insertAdjacentHTML('beforeend', keyValue);
    keyValue = '<audio class="audio" src="/assets/audio/cry.mp3"></audio>';
    this.train.insertAdjacentHTML('beforeend', keyValue);
    keyValue = '<audio class="soundEffects"></audio>';
    this.train.insertAdjacentHTML('beforeend', keyValue);
    let audioElement = new Audio('angry.mp3');
    audioElement.play();

  }



}