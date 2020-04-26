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

    return this.categories;
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
    this.isMode = !this.isMode;
  }
}