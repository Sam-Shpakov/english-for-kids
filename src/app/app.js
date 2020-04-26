import '../style/style.scss';
import CARDS from './cards.js';
import Header from './header.js';
import Categories from './categories.js';
import Category from './category.js';
import Statistics from './statistics.js';
import './cards.js';

window.onload = () => {
  const app = new App();
  app.initApp();
  app.addListeners();
};

class App {
  constructor() {
    this.isMode = true;
  }

  initApp() {
    const body = document.querySelector('body');
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');

    this.appcontainer = document.createElement('div');
    this.appcontainer.classList.add('app-container');

    this.container = document.createElement('div');
    this.container.classList.add('category-container');
    this.appcontainer.append(this.container);

    const header = new Header();
    this.appcontainer.prepend(header.getHeader());

    this.root.append(this.appcontainer);
    body.prepend(this.root);

    this.navigate();
    this.checkLocalStorage();
  }

  addListeners() {
    document.addEventListener('click', (event) => this.handlerClick(event));
    window.addEventListener('hashchange', () => this.navigate());
  }

  navigate() {
    let path = window.location.hash.slice(1);
    path = this.parsePath(path);
    this.removeContainer();
    switch (path[0]) {
      case "": {
        this.moveToCategories();
        break;
      }
      case "category": {
        this.moveToCategory(path[1]);
        break;
      }
      case "statistics": {
        this.moveToStatistics();
        break;
      }
    }

  }

  removeContainer() {
    let containerRemove = document.querySelector('.container');
    if (containerRemove != null) {
      containerRemove.remove();
    }
  }

  parsePath(path) {
    let result = path.split('/');
    return result;
  }

  moveToCategories() {
    this.showSwitch();
    this.categories = new Categories(this.isMode);
    this.container.append(this.categories.render());
  }



  moveToCategory(path) {
    this.showSwitch();
    if (path == 'difficult') {
      let arrayCategory = this.getDifficultWords();
      this.category = new Category(this.isMode);
      this.container.append(this.category.render(arrayCategory));
    } else {
      let indexCategory = this.searchIndexCategoryById(path);
      let arrayCategory = CARDS[indexCategory].slice();
      this.category = new Category(this.isMode);
      this.container.append(this.category.render(arrayCategory));
    }
  }

  getDifficultWords() {
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
    let difficultWords = bufAllWords.slice(0, 8);
    let flag = 0;
    difficultWords.forEach((key, index) => {
      if (key.rate == 0 && flag == 0) {
        difficultWords = difficultWords.slice(0, index);
        flag = 1;
      }
    });
    let updateDifficultWords = [];
    this.searchCardDifficultWord(difficultWords[0].word);
    difficultWords.forEach((key) => {
        console.log(key.word);
        updateDifficultWords.push(this.searchCardDifficultWord(key.word));
    });

    return updateDifficultWords;
  }

  searchCardDifficultWord(word) {
    let result = {};
    CARDS.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        CARDS[numCategory].forEach((key) => {
          if (key.word == word) {
            result = key;
          }
        });
      }
    });
    return result;
  }

  moveToStatistics() {
    this.hideSwitch();
    const statistics = new Statistics();
    this.appcontainer.append(statistics.render());
  }

  searchIndexCategoryById(id) {
    let result;
    CARDS[0].forEach((key, index) => {
      if (key.id == id) {
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

  isSwitchMode(event) {
    if (event.target.parentNode.className == 'switch' && event.target.tagName == 'SPAN') {
      return true;
    }
  }

  switchMode() {
    let indexCategory = this.searchIndexCategoryByPath();
    switch (indexCategory) {
      case 0: {
        this.categories.switchModeInMainPage();
        break;
      }
      default: {
        this.category.switchModeInCategory();
      }
    }
    this.isMode = !this.isMode;
  }

  searchIndexCategoryByPath() {
    let result = -1;
    let path = window.location.hash.slice(1);
    path = this.parsePath(path);
    if (path.length == 1) {
      result = 0;
    } else {
      CARDS[0].forEach((key, index) => {
        if (key.id == path[1]) {
          result = index + 1;
        }
      });
    }
    return result;
  }


  hideSwitch() {
    document.querySelector('.switch-container').style.display = 'none';
  }

  showSwitch() {
    document.querySelector('.switch-container').style.display = 'block';
  }


  checkLocalStorage() {
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
    if (this.allWords == null) {
      this.createLocalStorage();
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
        });
      }
    });
    localStorage.setItem('allWords', JSON.stringify(this.allWords));
  }

}