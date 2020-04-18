import '../style/style.scss';
import CARDS from './cards.js';
import Header from './header.js';
import Main from './Main.js';
import Train from './train.js';
import Play from './play.js';
import '../script/cards.js';


window.onload = () => {
  const page = new Page();
  page.createPage();
  page.addListenersOnKeys();
};

class Page {
  constructor() {
    this.isMode = true;
    this.isStartGame = false;
    this.numberCategory = 0;
    this.trueWord = '';
    this.arrayWordsForGame = [];
    this.isWin = true;
    this.numberErrors = 0;
  }

  createPage() {
    const body = document.querySelector('body');
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');

    this.appcontainer = document.createElement('div');
    this.appcontainer.classList.add('app-container');

    this.header = document.createElement('div');
    this.header.classList.add('header-container');

    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.appcontainer.append(this.header);
    this.appcontainer.append(this.container);
    this.root.append(this.appcontainer);
    const header = new Header(this.header);
    header.createHeader();
    const main = new Main(this.container);
    main.createMain(this.isMode);
    body.prepend(this.root);
  }

  addListenersOnKeys() {
    document.addEventListener('click', (event) => this.handlerClick(event));
    document.addEventListener('mouseout', (event) => this.handlerMouseout(event));
  }

  handlerClick(event) {
    if (this.isBlurMenu(event)) {
      this.blurMenu();
    }

    if (this.isSwitchMode(event)) {
      this.switchMode();
    }

    if (this.isClickOnMainCard(event)) {
      this.clickOnMainCard(event);
    }

    if (this.isClickOnMainCard(event)) {
      this.clickOnMainCard(event);
    }

    if (this.isClickOnMenu(event)) {
      this.clickOnMenu(event);
    }

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

  handlerMouseout(event) {
    if (this.isMouseoutCard(event)) {
      this.mouseoutCard();
    }
  }

  isBlurMenu(event) {
    if (!event.target.classList.contains('menu') && event.target.tagName !== 'INPUT') {
      return true;
    }
  }

  blurMenu() {
    document.querySelector('.menuToggle>input').checked = false;
  }

  isSwitchMode(event) {
    if (event.target.parentNode.className == 'switch' && event.target.tagName == 'SPAN') {
      return true;
    }
  }

  switchMode() {
    if (this.numberCategory == 0) {
      let menu = document.querySelectorAll('.menu');
      let cards = document.querySelectorAll('.main-card');
      if (this.isMode) {
        document.querySelector('.switch-input').setAttribute('checked', '');
        for (let i = 0; i < menu.length; i++) {
          menu[i].classList.remove('green');
        }
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove('green');
        }
      } else {
        document.querySelector('.switch-input').removeAttribute('checked');
        for (let i = 0; i < menu.length; i++) {
          menu[i].classList.add('green');
        }
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.add('green');
        }
      }
    } else {
      if (this.isMode) {
        document.querySelector('.switch-input').setAttribute('checked', '');
        let button = document.querySelector('.btn');
        button.classList.remove('none');
        let menu = document.querySelectorAll('.menu');
        let cards = document.querySelectorAll('.card');
        for (let i = 0; i < menu.length; i++) {
          menu[i].classList.remove('green');
        }
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.add('card-cover');
          cards[i].querySelector('.card-header').classList.add('none');
          cards[i].querySelector('.rotate').classList.add('none');
        }

      } else {
        document.querySelector('.switch-input').removeAttribute('checked');
        let button = document.querySelector('.btn');
        button.classList.add('none');
        let menu = document.querySelectorAll('.menu');
        let cards = document.querySelectorAll('.card');
        for (let i = 0; i < menu.length; i++) {
          menu[i].classList.add('green');
        }
        for (let i = 0; i < cards.length; i++) {
          cards[i].classList.remove('card-cover');
          cards[i].querySelector('.card-header').classList.remove('none');
          cards[i].querySelector('.rotate').classList.remove('none');
        }
      }
    }
    this.isMode = !this.isMode;
  }

  isClickOnMainCard(event) {
    if (event.target.parentNode.classList.contains('main-card') || event.target.classList.contains('main-card')) {
      return true;
    }
  }

  clickOnMainCard(event) {
    let nameCategory = '';
    event.target.tagName == 'IMG' ? nameCategory = event.target.getAttribute('alt') : nameCategory = event.target.childNodes[0].getAttribute('alt');
    this.container.remove();
    this.searchNumberCategoryByName(nameCategory);
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.appcontainer.append(this.container);
    if (this.isMode) {
      const train = new Train(this.container);
      train.createTrain(this.numberCategory);
    } else {
      const play = new Play(this.container);
      play.createPlay(this.numberCategory);
    }
  }

  isClickOnMenu(event) {
    if (event.target.parentNode.classList.contains('header-item') || event.target.classList.contains('header-item')) {
      return true;
    }
  }

  clickOnMenu(event) {
    let nameCategory = '';
    let bufNumberCategory = this.numberCategory;
    nameCategory = event.target.innerHTML;
    this.searchNumberCategoryByName(nameCategory);
    if (bufNumberCategory == this.numberCategory) {
      return;
    }
    this.container.remove();
    if (this.numberCategory == 0) {
      this.createContainer('Main');
    } else {
      if (this.isMode) {
        this.createContainer('Train');
      } else {
        this.createContainer('Play');
      }
    }
  }

  createContainer(NameContainer) {
    if (NameContainer == 'Main') {
      this.container = document.createElement('div');
      this.container.classList.add('container');
      this.appcontainer.append(this.container);
      const main = new Main(this.container);
      main.createMain(this.isMode);
    } else if (NameContainer == 'Train') {
      this.container = document.createElement('div');
      this.container.classList.add('container');
      this.appcontainer.append(this.container);
      const train = new Train(this.container);
      train.createTrain(this.numberCategory);
    } else if (NameContainer == 'Play') {
      this.container = document.createElement('div');
      this.container.classList.add('container');
      this.appcontainer.append(this.container);
      const play = new Play(this.container);
      play.createPlay(this.numberCategory);
    }
  }

  searchNumberCategoryByName(nameCategory) {
    this.numberCategory = 0;
    CARDS[0].forEach((key, index) => {
      if (key == nameCategory) {
        this.numberCategory = index + 1;
      }
    });
  }

  isClickOnCard(event) {
    if ((event.target.parentNode.classList.contains('front') && !event.target.classList.contains('rotate')) || event.target.classList.contains('front')) {
      return true;
    }
  }

  searchCardByWord(word) {
    let src = '';
    CARDS[this.numberCategory].forEach((key, index) => {
      if (key.word == word) {
        src = key.audioSrc;
      }
    });
    return src;
  }

  clickOnCardModeTrain(wordClick) {
    let src = 'assets/';
    src += this.searchCardByWord(wordClick);
    let audio = document.querySelector('.audio');
    audio.setAttribute('src', src);
    audio.play();
  }

  clickOnCard(event) {
    let wordClick = event.target.childNodes[0].innerHTML;
    if (this.isTrain()) {
      this.clickOnCardModeTrain(wordClick);
    } else {
      if (this.isStartGame) {
        if (this.isTrueWord(wordClick)) {
          this.changeAfterSelectTrueWord();
          if (this.isFinishedWord()) {
            this.showResult();
          }
        }
        else {
          this.isWin = false;
          this.changeAfterSelectFailWord();
        }
      }
    }
  }

  isTrain() {
    if (this.isMode) {
      return true;
    }
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
    console.log('Click ' + this.trueWord);
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

  changeAfterSelectFailWord() {
    let src = 'assets/audio/error.mp3';
    this.numberErrors++;
    console.log(this.numberErrors);
    let audio = document.querySelector('.audio');
    audio.setAttribute('src', src);
    audio.play();
    let keyValue = '<div class="star-error"></div>';
    document.querySelector('.rating').classList.remove('none');
    document.querySelector('.rating').insertAdjacentHTML('beforeend', keyValue);
  }

  showResult() {
    if (this.isWin) {
      document.querySelector('.rating').remove();
      let keyValue = '<div class="rating" style="justify-content: center;">Win!</div>';
      this.container.insertAdjacentHTML('beforebegin', keyValue);
      let cards = document.querySelectorAll('.card');
      console.log('showResult' + cards[0].classList);
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none';
      }
      document.querySelector('body').classList.add('succes');
      document.querySelector('.btns').style.display = 'none';
      document.querySelector('.switch-container').style.display = 'none';
      setTimeout(() => { this.returnToMain(); }, 1000);
    } else {
      document.querySelector('.rating').remove();
      let keyValue = `<div class="rating" style="justify-content: center;">${this.numberErrors} Errors</div>`;
      this.container.insertAdjacentHTML('beforebegin', keyValue);
      let cards = document.querySelectorAll('.card');
      console.log('showResult' + cards[0].classList);
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none';
      }
      document.querySelector('body').classList.add('failure');
      document.querySelector('.btns').style.display = 'none';
      document.querySelector('.switch-container').style.display = 'none';
      setTimeout(() => { this.returnToMain(); }, 1000);
    }
  }

  returnToMain() {
    console.log('SOS');
    this.numberErrors = 0;
    document.querySelector('.rating').remove();
    document.querySelector('body').classList.remove('succes');
    document.querySelector('body').classList.remove('failure');
    document.querySelector('.btns').removeAttribute('style');
    document.querySelector('.switch-container').removeAttribute('style');
    this.numberCategory = 0;
    console.log('numberCategory ' + this.numberCategory);
    this.container.remove();
    this.createContainer('Main');
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

  randomWordsFromCategory() {
    this.arrayWordsForGame = [];
    CARDS[this.numberCategory].forEach((key, index) => {
      this.arrayWordsForGame.push(key.word);
    });
    this.arrayWordsForGame.sort(() => Math.random() - 0.5);
  }

  clickOnButtonStartGame(event) {
    if (!event.target.classList.contains('repeat')) {
      event.target.classList.add('repeat');
      this.randomWordsFromCategory();
      this.trueWord = this.arrayWordsForGame[0];
      let src = 'assets/';
      console.log(this.trueWord);
      src += this.searchCardByWord(this.trueWord);
      let audio = document.querySelector('.audio');
      audio.setAttribute('src', src);
      audio.play();
      this.isStartGame = true;
    } else {
      let src = 'assets/';
      console.log(this.trueWord);
      src += this.searchCardByWord(this.trueWord);
      let audio = document.querySelector('.audio');
      audio.setAttribute('src', src);
      audio.play();
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