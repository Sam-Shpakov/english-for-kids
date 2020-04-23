import CARDS from './cards.js';

export default class Header {

  getHeader() {
    this.header = document.createElement('div');
    this.header.classList.add('header-container');

    this.navigation = document.createElement('nav');
    this.navigation.classList.add('navigation');
    this.menuToggle = document.createElement('div');
    this.menuToggle.classList.add('menuToggle');
    this.navigation.append(this.menuToggle);
    this.menuCheckbox = document.createElement('input');
    this.menuCheckbox.setAttribute('type', 'checkbox');
    this.menuToggle.append(this.menuCheckbox);
    this.menuSpan1 = document.createElement('span');
    this.menuToggle.append(this.menuSpan1);
    this.menuSpan2 = document.createElement('span');
    this.menuToggle.append(this.menuSpan2);
    this.menuSpan3 = document.createElement('span');
    this.menuToggle.append(this.menuSpan3);
    this.menuUl = document.createElement('ul');
    this.menuUl.classList.add('menu');
    this.menuUl.classList.add('green');
    this.menuToggle.append(this.menuUl);
    let keyInput = '<a class="header-item active" href="#">Main Page</a>';
    this.menuUl.insertAdjacentHTML('beforeend', keyInput);
    CARDS[0].forEach((key) => {
      if (key.id != 'statistics') {
        let keyValue = `<a class="header-item" href="#category/${key.id}">${key.name}</a>`;
        this.menuUl.insertAdjacentHTML('beforeend', keyValue);
      }
    });
    keyInput = `<a class="header-item" href="#statistics">Statistics</a>`;
    this.menuUl.insertAdjacentHTML('beforeend', keyInput);

    this.switch = document.createElement("div");
    this.switch.classList.add("switch-container");
    this.switchLabel = document.createElement("label");
    this.switchLabel.classList.add("switch");
    this.switch.append(this.switchLabel);
    keyInput = '<input type="checkbox" class="switch-input" checked="">';
    this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
    keyInput = '<span class="switch-label" data-on="Train" data-off="Play"></span>';
    this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
    keyInput = '<span class="switch-handle"></span>';
    this.switchLabel.insertAdjacentHTML('beforeend', keyInput);

    this.header.append(this.navigation);
    this.header.append(this.switch);

    document.addEventListener('click', (event) => this.handlerClick(event));

    return this.header;
  }

  handlerClick(event) {
    if (this.isBlurMenu(event)) {
      this.blurMenu();
    }

    if (this.isClickOnMenu(event)) {
      this.clickOnMenu(event);
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

  isClickOnMenu(event) {
    if (event.target.classList.length != 0) {
      if (event.target.parentNode.classList.contains('header-item') || event.target.classList.contains('header-item')) {
        return true;
      }
    }
  }

  clickOnMenu(event) {
    this.controlActiveItem(event);
  }

  controlActiveItem(event) {
    let menuItems = document.querySelectorAll('.header-item');
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
    }
    event.target.classList.add('active');
  }
}