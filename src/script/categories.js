import CARDS from './cards.js';

export default class Categories {
  constructor(isMode, navigate) {
    this.isMode = isMode;
    this.navigate = navigate;
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
        let link = './assets/' + key[1].image;
        let name = CARDS[0][index-1].name;
        let id = CARDS[0][index-1].id;
        let keyValue = `<a class="main-card green"  href="#category/${id}"><img src="${link}" alt="${name}">${name}</a>`;
        this.categories.insertAdjacentHTML('beforeend', keyValue);
      });
    } else {
      CARDS.forEach((key, index) => {
        if (index == 0) {
          return;
        }
        let link = './assets/' + key[1].image;
        let name = CARDS[0][index-1].name;
        let id = CARDS[0][index-1].id;
        let keyValue = `<a class="main-card"  href="#category/${id}"><img src="${link}" alt="${name}">${name}</a>`;
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

  сlickOnСategories() {
    //window.location.hash = '#category';
  }

}