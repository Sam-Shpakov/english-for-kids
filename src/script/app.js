import '../style/style.scss';
import CARDS from './cards.js';
import Header from './header.js';
import Categories from './categories.js';
import Category from './category.js';
import Difficult from './difficults.js';
import Statistics from './statistics.js';
import './cards.js';

window.onload = () => {
  const app = new App();
  app.initApp();
  app.addListeners();
};

class App {
  constructor() {
    this.isMode = false;
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
    console.log('INIT' );
    console.log(header);
    this.navigate();

    this.root.append(this.appcontainer);
    body.prepend(this.root);
    this.getStatistics();
  }

  addListeners() {
    document.addEventListener('click', (event) => this.handlerClick(event));
    window.addEventListener('hashchange', () => this.navigate());
  }

  navigate() {
    let path = window.location.hash.slice(1);
    console.log('Навигация работает' +  path);
    let newPath = this.parsePath(path);
    this.removeContainer();
    console.log('newPath ' + newPath.length);

    switch (newPath[0]) {
      case "": {
        this.moveToCategories();
        break;
      }

      case "category": {
        console.log('Категория работает');
        this.moveToCategory(newPath[1]);
        break;
      }

      case "statistics": {
        console.log('Cтатистика работает');
        this.moveToStatistics();
        break;
      }
    }

  }

  removeContainer() {
    this.container = document.querySelector('.container');
    if (this.container != null) {
      this.container.remove();
    }
  }

  parsePath(path) {
    let result = path.split('/');
    return result;
  }

  moveToCategories() {
    const categories = new Categories(this.isMode, this.navigate);
    this.appcontainer.append(categories.render());
  }

  moveToCategory(path) {
    let indexCategory = this.searchIndexCategoryById(path);
    if(indexCategory){
      console.log();
    }
    const category = new Category(this.isMode, this.navigate);
    this.appcontainer.append(category.render(indexCategory));
  }

  moveToStatistics() {
    console.log(this.appcontainer);
    const statistics = new Statistics();
    console.log(this.appcontainer);
    this.appcontainer.append(statistics.render());
  }

  searchIndexCategoryById(id) {
    let result;
    CARDS[0].forEach((key, index) => {
      if (key.id == id) {
        console.log('index ' + index);
        result = index + 1;
      }
    });
    return result;
  }


  handlerClick(event) {

    if (this.isSwitchMode(event)) {
      this.switchMode();
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



  controlActiveItem(event) {
    let menuItems = document.querySelectorAll('.header-item');
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
    }
    event.target.classList.add('active');
  }

  // createContainer(NameContainer) {
  //   switch (NameContainer) {
  //     case 'Main': {
  //       this.container = document.createElement('div');
  //       this.container.classList.add('container');
  //       this.appcontainer.append(this.container);
  //       const main = new Main(this.container);
  //       main.createMain(this.isMode);
  //       break;
  //     }

  //     case 'Train': {
  //       this.container = document.createElement('div');
  //       this.container.classList.add('container');
  //       this.appcontainer.append(this.container);
  //       const train = new Train(this.container);
  //       train.createTrain(this.numberCategory);
  //       break;
  //     }

  //     case 'Play': {
  //       this.container = document.createElement('div');
  //       this.container.classList.add('container');
  //       this.appcontainer.append(this.container);
  //       const play = new Play(this.container);
  //       play.createPlay(this.numberCategory);
  //       break;
  //     }

  //     case 'Statistics': {
  //       this.container = document.createElement('div');
  //       this.container.classList.add('container');
  //       this.appcontainer.append(this.container);
  //       const statistics = new Statistics(this.container);
  //       statistics.createStatistics();
  //       this.isMode = true;
  //       break;
  //     }
  //   }
  // }

  searchNumberCategoryByName(nameCategory) {
    this.numberCategory = 0;
    CARDS[0].forEach((key, index) => {
      if (key == nameCategory) {
        this.numberCategory = index + 1;
      }
    });
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

  // clickOnCardModeTrain(wordClick) {
  //   this.addWordInLocalStorageModeTrain(wordClick);
  //   let src = 'assets/';
  //   src += this.searchCardByWord(wordClick);
  //   let audio = document.querySelector('.audio');
  //   audio.setAttribute('src', src);
  //   audio.play();
  // }

  // clickOnCardModePlay(wordClick) {
  //   if (this.isStartGame()) {
  //     if (this.isTrueWord(wordClick)) {
  //       this.addWordInLocalStorageModePlayGuess(this.trueWord);
  //       this.changeAfterSelectTrueWord();
  //       if (this.isFinishedWord()) {
  //         this.showResult();
  //       }
  //     } else {
  //       this.isWin = false;
  //       this.changeAfterSelectFailWord(event, this.trueWord);
  //     }
  //   }
  // }

  // isStartGame() {
  //   if (document.querySelector('.btn').classList.contains('repeat')) {
  //     return true;
  //   }
  // }


  // addWordInLocalStorageModeTrain(addWord) {
  //   this.allWords = JSON.parse(localStorage.getItem('allWords'));
  //   if (this.allWords == null) {
  //     this.createLocalStorage();
  //     this.allWords.forEach((key) => {
  //       if (key.word == addWord) {
  //         key.countTrain++;
  //       }
  //     });
  //   } else {
  //     this.allWords.forEach((key) => {
  //       if (key.word == addWord) {
  //         key.countTrain++;
  //       }
  //     });
  //   }
  //   localStorage.setItem('allWords', JSON.stringify(this.allWords));
  // }

  // addWordInLocalStorageModePlayGuess(addWord) {
  //   this.allWords = JSON.parse(localStorage.getItem('allWords'));
  //   if (this.allWords == null) {
  //     this.createLocalStorage();
  //     this.allWords.forEach((key) => {
  //       if (key.word == addWord) {
  //         key.guessPlay++;
  //         key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
  //       }
  //     });
  //   } else {
  //     this.allWords.forEach((key) => {
  //       if (key.word == addWord) {
  //         key.guessPlay++;
  //         key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
  //       }
  //     });
  //   }
  //   localStorage.setItem('allWords', JSON.stringify(this.allWords));
  // }

  // addWordInLocalStorageModePlayError(addWord) {
  //   this.allWords = JSON.parse(localStorage.getItem('allWords'));
  //   if (this.allWords == null) {
  //     this.createLocalStorage();
  //     this.allWords.forEach((key) => {
  //       if (key.word == addWord) {
  //         key.ErrorsPlay++;
  //         key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
  //       }
  //     });
  //   } else {
  //     this.allWords.forEach((key) => {
  //       if (key.word == addWord) {
  //         key.ErrorsPlay++;
  //         key.rate = Math.floor(key.ErrorsPlay / (key.guessPlay + key.ErrorsPlay) * 100);
  //       }
  //     });
  //   }
  //   localStorage.setItem('allWords', JSON.stringify(this.allWords));
  // }

  // searchCardByWord(word) {
  //   let src = '';
  //   CARDS.forEach((keyCategory, numCategory) => {
  //     if (numCategory != 0) {
  //       CARDS[numCategory].forEach((key) => {
  //         if (key.word == word) {
  //           src = key.audioSrc;
  //         }
  //       });
  //     }
  //   });
  //   return src;
  // }

  // isTrueWord(wordClick) {
  //   if (this.trueWord == wordClick) {
  //     return true;
  //   }
  // }

  // isFinishedWord() {
  //   if (this.trueWord == undefined) {
  //     return true;
  //   }
  // }

  // changeAfterSelectTrueWord() {
  //   let src = 'assets/audio/correct.mp3';
  //   let audio = document.querySelector('.audio');
  //   audio.setAttribute('src', src);
  //   audio.play();
  //   this.arrayWordsForGame.shift();
  //   this.trueWord = this.arrayWordsForGame[0];
  //   let trueWord = this.trueWord;
  //   let newSrc = 'assets/';
  //   newSrc += this.searchCardByWord(trueWord);
  //   let i = 0;
  //   audio.onended = function () {
  //     if (i == 0) {
  //       audio = document.querySelector('.audio');
  //       audio.setAttribute('src', newSrc);
  //       audio.play();
  //       i++;
  //     }
  //   };
  //   this.trueWord = this.arrayWordsForGame[0];
  //   event.target.classList.add('inactive');
  //   let keyValue = '<div class="star-succes"></div>';
  //   document.querySelector('.rating').classList.remove('none');
  //   document.querySelector('.rating').insertAdjacentHTML('beforeend', keyValue);

  // }

  // changeAfterSelectFailWord(event, wordClick) {
  //   if (this.checkInactiveCard(event)) {
  //     this.addWordInLocalStorageModePlayError(wordClick);
  //     let src = 'assets/audio/error.mp3';
  //     this.numberErrors++;
  //     let audio = document.querySelector('.audio');
  //     audio.setAttribute('src', src);
  //     audio.play();
  //     let keyValue = '<div class="star-error"></div>';
  //     document.querySelector('.rating').classList.remove('none');
  //     document.querySelector('.rating').insertAdjacentHTML('beforeend', keyValue);
  //   }
  // }

  // checkInactiveCard(event) {
  //   if (!event.target.classList.contains('inactive')) {
  //     return true;
  //   }
  // }

  // showResult() {
  //   if (this.isWin) {
  //     document.querySelector('.rating').remove();
  //     let keyValue = '<div class="rating" style="justify-content: center;">Win!</div>';
  //     this.container = document.querySelector('.container');
  //     this.container.insertAdjacentHTML('beforebegin', keyValue);
  //     let cards = document.querySelectorAll('.card');
  //     for (let i = 0; i < cards.length; i++) {
  //       cards[i].style.display = 'none';
  //     }
  //     document.querySelector('body').classList.add('succes');
  //     document.querySelector('.btns').style.display = 'none';
  //     document.querySelector('.switch-container').style.display = 'none';
  //     setTimeout(() => {
  //       this.returnToMain();
  //     }, 3000);
  //   } else {
  //     document.querySelector('.rating').remove();
  //     let keyValue = `<div class="rating" style="justify-content: center;">${this.numberErrors} Errors</div>`;
  //     this.container = document.querySelector('.container');
  //     this.container.insertAdjacentHTML('beforebegin', keyValue);
  //     let cards = document.querySelectorAll('.card');
  //     for (let i = 0; i < cards.length; i++) {
  //       cards[i].style.display = 'none';
  //     }
  //     document.querySelector('body').classList.add('failure');
  //     document.querySelector('.btns').style.display = 'none';
  //     document.querySelector('.switch-container').style.display = 'none';
  //     setTimeout(() => {
  //       this.returnToMain();
  //     }, 3000);
  //   }
  // }

  // returnToMain() {
  //   this.numberErrors = 0;
  //   document.querySelector('.rating').remove();
  //   document.querySelector('body').classList.remove('succes');
  //   document.querySelector('body').classList.remove('failure');
  //   document.querySelector('.btns').removeAttribute('style');
  //   document.querySelector('.switch-container').removeAttribute('style');
  //   this.numberCategory = 0;
  //   this.container.remove();
  //   this.createContainer('Main');
  // }



  // isClickOnRotate(event) {
  //   if (event.target.classList.contains('rotate')) {
  //     return true;
  //   }
  // }

  // clickOnRotate(event) {
  //   event.target.parentNode.classList.add('translate');
  // }




  // isClickOnButtonStartGame(event) {
  //     if (event.target.classList.contains('btn')) {
  //       return true;
  //     }
  //   }

  //   clickOnButtonStartGame(event) {
  //     if (!event.target.classList.contains('repeat')) {
  //       this.numberErrors = 0;
  //       event.target.classList.add('repeat');
  //       if (this.numberCategory != 9) {
  //         this.randomWordsFrom(CARDS[this.numberCategory]);
  //       } else {
  //         this.randomWordsFrom(this.difficultWords);
  //       }
  //       this.trueWord = this.arrayWordsForGame[0];
  //       let src = 'assets/';
  //       src += this.searchCardByWord(this.trueWord);
  //       let audio = document.querySelector('.audio');
  //       audio.setAttribute('src', src);
  //       audio.play();
  //       this.isWin = true;
  //     } else {
  //       let src = 'assets/';
  //       src += this.searchCardByWord(this.trueWord);
  //       let audio = document.querySelector('.audio');
  //       audio.setAttribute('src', src);
  //       audio.play();
  //     }
  //   }
  // randomWordsFrom(array) {
  //   this.arrayWordsForGame = [];
  //   array.forEach((key) => {
  //     this.arrayWordsForGame.push(key.word);
  //   });
  //   this.arrayWordsForGame.sort(() => Math.random() - 0.5);
  // }




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

  getStatistics() {
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
    if (this.allWords == null) {
      this.createLocalStorage();
    }
  }

  // goToTrain() {
  //   let menu = document.querySelectorAll('.menu');
  //   document.querySelector('.switch-input').setAttribute('checked', '');
  //   for (let i = 0; i < menu.length; i++) {
  //     menu[i].classList.add('green');
  //   }

  //   this.header = document.querySelector('.header-container');
  //   this.switch = document.querySelector('.switch-container');
  //   this.switch.remove();
  //   this.switch = document.createElement("div");
  //   this.switch.classList.add("switch-container");
  //   this.switchLabel = document.createElement("label");
  //   this.switchLabel.classList.add("switch");
  //   this.switch.append(this.switchLabel);
  //   let keyInput = '<input type="checkbox" class="switch-input" checked="">';
  //   this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
  //   keyInput = '<span class="switch-label" data-on="Train" data-off="Play"></span>';
  //   this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
  //   keyInput = '<span class="switch-handle"></span>';
  //   this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
  //   this.header.append(this.switch);
  //   document.querySelector('.switch-container').style.display = 'none';
  // }

}