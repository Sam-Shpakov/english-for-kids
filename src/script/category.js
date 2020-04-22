import CARDS from './cards.js';

export default class Category {
  constructor(isMode, navigate) {
    this.isMode = isMode;
    this.navigate = navigate;
    this.numberErrors = 0; 
  }

  render(indexCategory) {
    this.category = document.createElement('div');
    this.category.classList.add('container');
    let keyValue = '<div class="rating none"></div>';
    this.category.insertAdjacentHTML('beforeend', keyValue);

    this.indexCategory = indexCategory;

    if (this.isMode) {
      CARDS[indexCategory].forEach((key) => {
        let link = './assets/' + key.image;
        let word = key.word;
        let translation = key.translation;
        keyValue = `<div class="card-container"><div class="card"><div class="front" style="background-image: url(${link});"><div class="card-header">${word}</div></div><div class="back" style="background-image: url(${link}"><div class="card-header">${translation}</div></div><div class="rotate"></div></div></div>`;
        this.category.insertAdjacentHTML('beforeend', keyValue);
      });
      keyValue = '<div class="btns"><button class="btn none">Start game</button></div>';
      this.category.insertAdjacentHTML('beforeend', keyValue);
      keyValue = '<audio class="audio"></audio>';
      this.category.insertAdjacentHTML('beforeend', keyValue);
      keyValue = '<audio class="soundEffects"></audio>';
      this.category.insertAdjacentHTML('beforeend', keyValue);
    } else {
      CARDS[indexCategory].forEach((key) => {
        let link = './assets/' + key.image;
        let word = key.word;
        let translation = key.translation;
        keyValue = `<div class="card-container"><div class="card card-cover"><div class="front" style="background-image: url(${link});"><div class="card-header none">${word}</div></div><div class="back" style="background-image: url(${link}"><div class="card-header none">${translation}</div></div><div class="rotate none"></div></div></div>`;
        this.category.insertAdjacentHTML('beforeend', keyValue);
      });
      keyValue = '<div class="btns"><button class="btn">Start game</button></div>';
      this.category.insertAdjacentHTML('beforeend', keyValue);
      keyValue = '<audio class="audio"></audio>';
      this.category.insertAdjacentHTML('beforeend', keyValue);
      keyValue = '<audio class="soundEffects"></audio>';
      this.category.insertAdjacentHTML('beforeend', keyValue);
    }

    this.category.addEventListener('click', (event) => this.handlerClick(event));
    this.category.addEventListener('mouseout', (event) => this.handlerMouseout(event));
    return this.category;
  }

  handlerClick(event) {
    if (this.isClickOnCard(event)) {
      this.clickOnCard(event);
    }

    if (this.isClickOnRotate(event)) {
      this.clickOnRotate(event);
    }

    if (this.isClickOnButtonStartGame(event)) {
      this.clickOnButtonStartGame(event);
    }


  }

  isClickOnCard(event) {
    if ((event.target.parentNode.classList.contains('front') && !event.target.classList.contains('rotate')) || event.target.classList.contains('front')) {
      return true;
    }
  }

  clickOnCard(event) {
    let wordClick = event.target.childNodes[0].innerHTML;
    if (this.isMode) {
      this.clickOnCardModeTrain(wordClick);
    } else {
      this.clickOnCardModePlay(wordClick);
    }
  }

  clickOnCardModeTrain(wordClick) {
    this.addWordInLocalStorageModeTrain(wordClick);
    let src = 'assets/';
    src += this.searchCardByWord(wordClick);
    let audio = document.querySelector('.audio');
    audio.setAttribute('src', src);
    audio.play();
  }

  clickOnCardModePlay(wordClick) {
    if (this.isStartGame()) {
      if (this.isTrueWord(wordClick)) {
        this.addWordInLocalStorageModePlayGuess(this.trueWord);
        this.changeAfterSelectTrueWord();
        if (this.isFinishedWord()) {
          this.showResult();
        }
      } else {
        this.isWin = false;
        this.changeAfterSelectFailWord(event, this.trueWord);
      }
    }
  }

  addWordInLocalStorageModeTrain(addWord) {
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
    if (this.allWords == null) {
      this.createLocalStorage();
      this.allWords.forEach((key) => {
        if (key.word == addWord) {
          key.countTrain++;
        }
      });
    } else {
      this.allWords.forEach((key) => {
        if (key.word == addWord) {
          key.countTrain++;
        }
      });
    }
    localStorage.setItem('allWords', JSON.stringify(this.allWords));
  }

  addWordInLocalStorageModePlayGuess(addWord) {
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
    if (this.allWords == null) {
      this.createLocalStorage();
      this.allWords.forEach((key) => {
        if (key.word == addWord) {
          key.guessPlay++;
          key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
        }
      });
    } else {
      this.allWords.forEach((key) => {
        if (key.word == addWord) {
          key.guessPlay++;
          key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
        }
      });
    }
    localStorage.setItem('allWords', JSON.stringify(this.allWords));
  }

  addWordInLocalStorageModePlayError(addWord) {
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
    if (this.allWords == null) {
      this.createLocalStorage();
      this.allWords.forEach((key) => {
        if (key.word == addWord) {
          key.ErrorsPlay++;
          key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
        }
      });
    } else {
      this.allWords.forEach((key) => {
        if (key.word == addWord) {
          key.ErrorsPlay++;
          key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
        }
      });
    }
    localStorage.setItem('allWords', JSON.stringify(this.allWords));
  }

  isTrueWord(wordClick) {
    if (this.trueWord == wordClick) {
      return true;
    }
  }

  isFinishedWord() {
    if (this.trueWord == undefined) {
      return true;
    }
  }

  changeAfterSelectTrueWord() {
    let src = 'assets/audio/correct.mp3';
    let audio = document.querySelector('.audio');
    audio.setAttribute('src', src);
    audio.play();
    this.arrayWordsForGame.shift();
    this.trueWord = this.arrayWordsForGame[0];
    let trueWord = this.trueWord;
    let newSrc = 'assets/';
    newSrc += this.searchCardByWord(trueWord);
    let i = 0;
    audio.onended = function () {
      if (i == 0) {
        audio = document.querySelector('.audio');
        audio.setAttribute('src', newSrc);
        audio.play();
        i++;
      }
    };
    this.trueWord = this.arrayWordsForGame[0];
    event.target.classList.add('inactive');
    let keyValue = '<div class="star-succes"></div>';
    document.querySelector('.rating').classList.remove('none');
    document.querySelector('.rating').insertAdjacentHTML('beforeend', keyValue);

  }

  changeAfterSelectFailWord(event, wordClick) {
    if (this.checkInactiveCard(event)) {
      this.addWordInLocalStorageModePlayError(wordClick);
      let src = 'assets/audio/error.mp3';
      this.numberErrors++;
      let audio = document.querySelector('.audio');
      audio.setAttribute('src', src);
      audio.play();
      let keyValue = '<div class="star-error"></div>';
      document.querySelector('.rating').classList.remove('none');
      document.querySelector('.rating').insertAdjacentHTML('beforeend', keyValue);
    }
  }

  checkInactiveCard(event) {
    if (!event.target.classList.contains('inactive')) {
      return true;
    }
  }

  showResult() {
    if (this.isWin) {
      document.querySelector('.rating').remove();
      let keyValue = '<div class="rating" style="justify-content: center;">Win!</div>';
      this.container = document.querySelector('.container');
      this.container.insertAdjacentHTML('beforebegin', keyValue);
      let cards = document.querySelectorAll('.card');
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none';
      }
      document.querySelector('body').classList.add('succes');
      document.querySelector('.btns').style.display = 'none';
      document.querySelector('.switch-container').style.display = 'none';
      setTimeout(() => {
        this.returnToMain();
      }, 3000);
    } else {
      document.querySelector('.rating').remove();
      let keyValue = `<div class="rating" style="justify-content: center;">${this.numberErrors} Errors</div>`;
      this.container = document.querySelector('.container');
      this.container.insertAdjacentHTML('beforebegin', keyValue);
      let cards = document.querySelectorAll('.card');
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none';
      }
      document.querySelector('body').classList.add('failure');
      document.querySelector('.btns').style.display = 'none';
      document.querySelector('.switch-container').style.display = 'none';
      setTimeout(() => {
        this.returnToMain();
      }, 3000);
    }
  }

  returnToMain() {
    this.numberErrors = 0;
    document.querySelector('.rating').remove();
    document.querySelector('body').classList.remove('succes');
    document.querySelector('body').classList.remove('failure');
    document.querySelector('.btns').removeAttribute('style');
    document.querySelector('.switch-container').removeAttribute('style');
    this.numberCategory = 0;
    this.container.remove();
    window.location.hash = '#';
  }

  isClickOnRotate(event) {
    if (event.target.classList.contains('rotate')) {
      return true;
    }
  }

  clickOnRotate(event) {
    event.target.parentNode.classList.add('translate');
  }

  isClickOnButtonStartGame(event) {
    if (event.target.classList.contains('btn')) {
      return true;
    }
  }

  clickOnButtonStartGame(event) {

    if (!event.target.classList.contains('repeat')) {
      this.numberErrors = 0;
      event.target.classList.add('repeat');
      if (this.numberCategory != 9) {
        this.randomWordsFrom(CARDS[this.indexCategory]);
      } else {
        this.randomWordsFrom(this.difficultWords);
      }
      this.trueWord = this.arrayWordsForGame[0];
      let src = 'assets/';
      src += this.searchCardByWord(this.trueWord);
      let audio = document.querySelector('.audio');
      audio.setAttribute('src', src);
      audio.play();
      this.isWin = true;
    } else {
      let src = 'assets/';
      src += this.searchCardByWord(this.trueWord);
      let audio = document.querySelector('.audio');
      audio.setAttribute('src', src);
      audio.play();
    }
  }

  randomWordsFrom(array) {
    this.arrayWordsForGame = [];
    array.forEach((key) => {
      this.arrayWordsForGame.push(key.word);
    });
    this.arrayWordsForGame.sort(() => Math.random() - 0.5);
  }

  isStartGame() {
    if (document.querySelector('.btn').classList.contains('repeat')) {
      return true;
    }
  }

  searchCardByWord(word) {
    let src = '';
    CARDS.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        CARDS[numCategory].forEach((key) => {
          if (key.word == word) {
            src = key.audioSrc;
          }
        });
      }
    });
    return src;
  }


  handlerMouseout(event) {
    if (this.isMouseoutCard(event)) {
      this.mouseoutCard();
    }
  }

  isMouseoutCard(event) {
    if ((event.target.classList.contains('rotate') && !event.relatedTarget.classList.contains('back')) || event.target.classList.contains('card-container') || event.target.classList.contains('card') || event.target.classList.contains('front') || event.target.classList.contains('back')) {
      return true;
    }
  }

  mouseoutCard() {
    event.target.classList.remove('translate');
    event.target.parentNode.classList.remove('translate');
  }

}