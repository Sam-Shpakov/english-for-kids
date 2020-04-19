import CARDS from './cards.js';

export default class Difficult {
  constructor() {
    this.appcontainer = document.querySelector('.app-container');
    this.difficult = document.querySelector('.container');
  }

  createDifficult() {
    this.difficult.remove();
    this.difficult = document.createElement('div');
    this.difficult.classList.add('container');
    this.appcontainer.append(this.difficult);

    document.querySelector('.switch-container').style.display = 'block';
    let keyValue = '<div class="rating none"></div>';
    this.difficult.insertAdjacentHTML('beforeend', keyValue);
    this.getDifficultWord();
    this.allWord.forEach((key) => {
      let link = './assets/';
      this.searchInfoDifficultWord(key.translation);
      let word = key.word;
      let translation = this.result[0];
      link += this.result[1];

      keyValue = `<div class="card-container"><div class="card"><div class="front" style="background-image: url(${link});"><div class="card-header">${word}</div></div><div class="back" style="background-image: url(${link}"><div class="card-header">${translation}</div></div><div class="rotate"></div></div></div>`;
      this.difficult.insertAdjacentHTML('beforeend', keyValue);
    });
    keyValue = '<div class="btns"><button class="btn none">Start game</button></div>';
    this.difficult.insertAdjacentHTML('beforeend', keyValue);
    keyValue = '<audio class="audio"></audio>';
    this.difficult.insertAdjacentHTML('beforeend', keyValue);
    keyValue = '<audio class="soundEffects"></audio>';
    this.difficult.insertAdjacentHTML('beforeend', keyValue);

    return this.allWord;
  }

  

  getDifficultWord() {
    let bufAllWords = JSON.parse(localStorage.getItem('allWords'));
    bufAllWords.sort(function (a, b) {
      if (a.rate < b.rate) {
        return 1;
      }
      if (a.rate > b.rate) {
        return -1;
      }
      return 0;
    });
    this.allWord = bufAllWords.slice(0, 8);
    let flag = 0;
    this.allWord.forEach((key, index) => {
      if (key.rate == 0 && flag == 0) {
        this.allWord = this.allWord.slice(0, index);
        flag = 1;
      }
    });
  }

  searchInfoDifficultWord(translation) {
    this.result = [];
    CARDS.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        CARDS[numCategory].forEach((key) => {
          if (key.translation == translation) {
            this.result[0] = key.translation;
            this.result[1] = key.image;
            this.result[2] = key.audioSrc;
          }
        });
      }
    });
  }
}