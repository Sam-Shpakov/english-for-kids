import CARDS from './cards.js';

export default class Categories {
  constructor(isMode) {
    this.isMode = isMode;
  }

  render() {
    this.categories = document.createElement('div');
    this.categories.classList.add('container');
    this.categories.classList.add('main-container');
    if (this.isMode) {
      CARDS.forEach((key, index) => {
        if (index == 0) {
          return;
        }
        let src = CARDS[index][1];
        let link = './assets/';

        for (let keySrc in src) {
          if (keySrc == 'image') {
            link += src[keySrc];
          }
        }
        let keyValue = `<a class="main-card green" href="#/categories"><img src="${link}" alt="${CARDS[0][index-1]}">${CARDS[0][index-1]}</a>`;
        this.categories.insertAdjacentHTML('beforeend', keyValue);
      });
    } else {
      CARDS.forEach((key, index) => {
        if (index == 0) {
          return;
        }
        let src = CARDS[index][1];
        let link = './assets/';

        for (let keySrc in src) {
          if (keySrc == 'image') {
            link += src[keySrc];
          }
        }
        let keyValue = `<a class="main-card" href="#/categories"><img src="${link}" alt="${CARDS[0][index-1]}">${CARDS[0][index-1]}</a>`;
        this.categories.insertAdjacentHTML('beforeend', keyValue);
      });
    }
    return this.categories;
  }

}