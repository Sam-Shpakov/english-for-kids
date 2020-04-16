import CARDS from './cards.js';

export default class Play {
  constructor(play) {
    this.play = play;
  }

  createPlay(category) {
    let keyValue = '<div class="rating none"></div>';
    this.play.insertAdjacentHTML('beforeend', keyValue);
    CARDS[category].forEach((key, index) => {
      let card = CARDS[category][index];
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
      keyValue = `<div class="card-container"><div class="card card-cover"><div class="front" style="background-image: url(${link});"><div class="card-header none">${word}</div></div><div class="back" style="background-image: url(${link}"><div class="card-header none">${translation}</div></div><div class="rotate none"></div></div></div>`;
      this.play.insertAdjacentHTML('beforeend', keyValue);
    });
    keyValue = '<div class="btns"><button class="btn">Start game</button></div>';
    this.play.insertAdjacentHTML('beforeend', keyValue);
    keyValue = '<audio class="audio"></audio>';
    this.play.insertAdjacentHTML('beforeend', keyValue); 
    keyValue = '<audio class="soundEffects"></audio>';
    this.play.insertAdjacentHTML('beforeend', keyValue); 
  }


}