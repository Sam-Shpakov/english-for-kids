import CARDS from './cards.js';

export default class Header {
  constructor(header) {
    this.header = header;
  }

  createHeader() {
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
    let keyInput = '<a class="header-item active" href="#/">Main Page</a>';
    this.menuUl.insertAdjacentHTML('beforeend', keyInput);
    CARDS[0].forEach((key) => {
      let keyValue = `<a class="header-item" href="#/">${key}</a>`;
      this.menuUl.insertAdjacentHTML('beforeend', keyValue);
    });

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
  }

}