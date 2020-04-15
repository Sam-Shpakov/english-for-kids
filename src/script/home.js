import '../style/style.scss';
import Header from './header.js';
import Main from './main.js';
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
    this.container.classList.add('main-container');

    this.appcontainer.append(this.header);
    this.appcontainer.append(this.container);
    this.root.append(this.appcontainer);
    const header = new Header(this.header);
    header.createHeader();
    const main = new Main(this.container);
    main.createMain();
    body.prepend(this.root);
  }

  addListenersOnKeys() {
    document.addEventListener('click', (event) => this.handlerClick(event));
  }

  handlerClick(event) {
    if (this.isBlurMenu(event)) {
      this.blurMenu();
    }

    if (this.isSwitchMode(event)) {
      this.switchMode();
    }

    if (this.isClickOnCard(event)) {
      this.clickOnCard();
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
    if (event.target.parentNode.className == 'switch' && event.target.tagName =='SPAN') {
      return true;
    }
  }

  switchMode() {
    let menu = document.querySelectorAll('.menu');
    let cards = document.querySelectorAll('.main-card');
    if (this.isMode) {
      document.querySelector('.switch-input').setAttribute('checked', '');
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove('green');
      }
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove('green');
      }
    } else {
      document.querySelector('.switch-input').removeAttribute('checked');
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.add('green');
      }
      for (var i = 0; i < cards.length; i++) {
        cards[i].classList.add('green');
      }
    }
    this.isMode = !this.isMode;
  }

  isClickOnCard(event) {
    if (event.target.parentNode.classList.contains('main-card') || event.target.classList.contains('main-card')) {
      return true;
    }
  }

  clickOnCard() {
    this.container.remove();
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.appcontainer.append(this.container);
    const train = new Train(this.container);
    train.createTrain(3); 
  }

}