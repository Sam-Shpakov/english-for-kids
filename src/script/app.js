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

    const header = new Header();
    this.appcontainer.prepend(header.getHeader());

    this.root.append(this.appcontainer);
    body.prepend(this.root);
    this.getStatistics();

    this.navigate();
  }

  addListeners() {
    document.addEventListener('click', (event) => this.handlerClick(event));
    window.addEventListener('hashchange', () => this.navigate());
  }

  navigate() {
    let path = window.location.hash.slice(1);
    path = this.parsePath(path);
    this.removeContainer();
    console.log('newPath ' + path.length);

    switch (path[0]) {
      case "": {
        this.moveToCategories();
        break;
      }

      case "category": {
        console.log('Категория работает');
        this.moveToCategory(path[1]);
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
    this.categories = new Categories(this.isMode);
    this.appcontainer.append(this.categories.render());
  }

  moveToCategory(path) {
    if (path == 'difficult') {
      this.category = new Category(this.isMode);
      this.appcontainer.append(this.category.createDifficult());
    } else {
      let indexCategory = this.searchIndexCategoryById(path);
      this.category = new Category(this.isMode);
      this.appcontainer.append(this.category.render(indexCategory));
    }
  }

  moveToStatistics() {
    const statistics = new Statistics();
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

  isSwitchMode(event) {
    if (event.target.parentNode.className == 'switch' && event.target.tagName == 'SPAN') {
      return true;
    }
  }

  switchMode() {
    let indexCategory = this.searchIndexCategoryByPath();
    console.log(indexCategory);
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
    console.log('newPath ' + path.length);
    if (path.length == 1) {
      result = 0;
    } else {
      CARDS[0].forEach((key, index) => {
        if (key.id == path[1]) {
          console.log('index ' + index);
          result = index + 1;
        }
      });
    }
    return result;
  }





  getStatistics() {
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
          localStorage.setItem('allWords', JSON.stringify(this.allWords));
        });
      }
    });
  }

}