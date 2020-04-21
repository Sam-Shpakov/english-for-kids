import '../style/style.scss';
import CARDS from './cards.js';
import Header from './header.js';
import Categories from './categories.js';
import Main from './Main.js';
import Train from './train.js';
import Play from './play.js';
import Difficult from './difficult.js';
import Statistics from './statistics.js';
import './cards.js';


window.onload = () => {
  const app = new App();
  app.initApp();
  app.addListenersOnKeys();
};

class App {
  constructor() {
    this.isMode = true;
    this.numberCategory = 0;
    this.trueWord = '';
    this.arrayWordsForGame = [];
    this.isWin = true;
    this.numberErrors = 0;
  }

  initApp() {
    const body = document.querySelector('body');
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');

    this.appcontainer = document.createElement('div');
    this.appcontainer.classList.add('app-container');

    const header = new Header();
    this.appcontainer.prepend(header.getHeader());
    // let state = { displayTrophy: true };
    // window.history.replaceState(state, null, "/categories");
    // this.navigate(state); //и переход на по нужным URL
    let url = window.location.pathname;
    this.navigate(url); //и переход на по нужным URL
    console.log('url ' + url);
    this.root.append(this.appcontainer);
    body.prepend(this.root);
    this.getStatistics();
  }

  addListenersOnKeys() {
    document.addEventListener('click', (event) => this.handlerClick(event));
    document.addEventListener('mouseout', (event) => this.handlerMouseout(event));
  }
  changeHash(id) {

    try {
       history.pushState(null,null,'/' + id);
    }
    catch(e) {
       location.hash = '#id_'+id;
    }
    }

  navigate(path) {
    path = path.substring(2);
    console.log('path' + path);
    this.moveToCategories();
    switch (path) {
      case "cards": {
        console.log('sss');
        this.moveToCategories();
        break;
      }

      case "categories/": {

        break;
      }

      case "statistics": {

        break;
      }

    }

  }

  moveToCategories(){
    // addtourl();
    const categories = new Categories(this.isMode);
    this.appcontainer.append(categories.render());
  }



  handlerClick(event) {

    if (this.isSwitchMode(event)) {
      this.switchMode();
    }

    if (this.isClickOnСategories(event)) {
      this.сlickOnСategories(event);
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

    if (this.isClickOnButtonReset(event)) {
      this.clickOnButtonReset();
    }

    if (this.isClickOnButtonRepeatDifWord(event)) {
      this.clickOnButtonRepeatDifWord();
    }


    if (this.isClickOnTheadTable(event)) {
      this.clickOnTheadTable(event);
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
    switch (this.numberCategory) {
      case 0:
        this.switchModeInMainPage();
        break;
      default:
        this.switchModeInCategory();
    }
    this.isMode = !this.isMode;
  }

  switchModeInMainPage() {
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
  }

  switchModeInCategory() {
    if (this.isMode) {
      document.querySelector('.switch-input').setAttribute('checked', '');
      let button = document.querySelector('.btn');
      button.classList.remove('none');
      let menu = document.querySelectorAll('.menu');
      let cards = document.querySelectorAll('.card');
      document.querySelector('.rating').remove();
      let keyValue = '<div class="rating"></div>';
      document.querySelector('.container').insertAdjacentHTML('afterbegin', keyValue);
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
      button.classList.remove('repeat');
      let front = document.querySelectorAll('.front');
      for (let i = 0; i < front.length; i++) {
        front[i].classList.remove('inactive');
      }
      document.querySelector('.rating').remove();
      let keyValue = '<div class="rating none"></div>';
      document.querySelector('.container').insertAdjacentHTML('afterbegin', keyValue);
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



  isClickOnСategories(event) {
    if (event.target.parentNode.classList.contains('main-card') || event.target.classList.contains('main-card')) {
      return true;
    }
  }

  сlickOnСategories(event) {
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
    this.controlActiveItem(event);
    this.searchNumberCategoryByName(nameCategory);
    if (bufNumberCategory == this.numberCategory && this.numberCategory != 9) {
      return;
    }
    document.querySelector('.switch-container').style.display = 'block';
    this.container = document.querySelector('.container');
    this.container.remove();
    switch (this.numberCategory) {
      case 0:
        this.createContainer('Main');
        break;
      case 9:
        this.createContainer('Statistics');
        break;
      default: {
        if (this.isTrain()) {
          this.createContainer('Train');
        } else {
          this.createContainer('Play');
        }
      }
    }
  }

  isTrain() {
    if (this.isMode) {
      return true;
    }
  }


  controlActiveItem(event) {
    let menuItems = document.querySelectorAll('.header-item');
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
    }
    event.target.classList.add('active');
  }

  createContainer(NameContainer) {
    switch (NameContainer) {
      case 'Main': {
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.appcontainer.append(this.container);
        const main = new Main(this.container);
        main.createMain(this.isMode);
        break;
      }

      case 'Train': {
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.appcontainer.append(this.container);
        const train = new Train(this.container);
        train.createTrain(this.numberCategory);
        break;
      }

      case 'Play': {
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.appcontainer.append(this.container);
        const play = new Play(this.container);
        play.createPlay(this.numberCategory);
        break;
      }

      case 'Statistics': {
        this.container = document.createElement('div');
        this.container.classList.add('container');
        this.appcontainer.append(this.container);
        const statistics = new Statistics(this.container);
        statistics.createStatistics();
        this.isMode = true;
        break;
      }
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

  clickOnCard(event) {
    let wordClick = event.target.childNodes[0].innerHTML;
    if (this.isTrain()) {
      this.clickOnCardModeTrain(wordClick);
    } else {
      this.clickOnCardModePlay(wordClick);
    }
  }

  createLocalStorage() {
    this.allWords = [];
    CARDS.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        CARDS[numCategory].forEach((key) => {
          let bufWord = key.word;
          let translation = key.translation;
          this.allWords.push({
            word: bufWord,
            translation: translation,
            countTrain: 0,
            guessPlay: 0,
            ErrorsPlay: 0,
            rate: 0,
          });
          localStorage.setItem('allWords', JSON.stringify(this.allWords));
        });
      }
    });
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

  isStartGame() {
    if (document.querySelector('.btn').classList.contains('repeat')) {
      return true;
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

  clickOnButtonStartGame(event) {
    if (!event.target.classList.contains('repeat')) {
      this.numberErrors = 0;
      event.target.classList.add('repeat');
      if (this.numberCategory != 9) {
        this.randomWordsFrom(CARDS[this.numberCategory]);
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




  isClickOnButtonReset(event) {
    if (event.target.id == ('resetButton')) {
      return true;
    }
  }

  clickOnButtonReset() {
    this.container.remove();
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.appcontainer.append(this.container);
    const statistics = new Statistics(this.container);
    statistics.resetAllWords();
    statistics.createStatistics();
  }

  isClickOnButtonRepeatDifWord(event) {
    if (event.target.id == ('repeatButton')) {
      return true;
    }
  }

  clickOnButtonRepeatDifWord() {
    const difficult = new Difficult();
    this.difficultWords = difficult.createDifficult();
  }

  isClickOnTheadTable(event) {
    if (event.target.classList.contains('tableTh')) {
      return true;
    }
  }

  clickOnTheadTable(event) {
    const statistics = new Statistics(this.container);
    statistics.getSortTable(event.target);
  }

  getStatistics(){
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
    if (this.allWords == null) {
      this.createLocalStorage();
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