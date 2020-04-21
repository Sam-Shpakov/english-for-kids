import CARDS from './cards.js';

export default class Categories {
  constructor(isMode, navigate) {
    this.isMode = isMode;
    this.isMode = navigate;
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
        let keyValue = `<a class="main-card green" href="#categories"><img src="${link}" alt="${CARDS[0][index-1]}">${CARDS[0][index-1]}</a>`;
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

    this.categories.addEventListener('click', (event) => this.handlerClick(event));
    return this.categories;
  }

  handlerClick(event) {
    if (this.isClickOnСategories(event)) {
      this.сlickOnСategories();
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

  }

}