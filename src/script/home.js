import '../style/style.scss';
import Header from './header.js';
import Main from './main.js';
import Train from './main.js';
import Play from './main.js';
import '../script/cards.js';

class Page {
  constructor() {
    this.isStatus = true;
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


  handlerSwitch() {
    console.log( this.isStatus);
    if (this.isStatus) {
      document.getElementsByClassName('menu').forEach(element => element.classList.remove('green'));
      document.getElementsByClassName('main-card').forEach(element => element.classList.remove('green'));
    } else {
      document.getElementsByClassName('menu').forEach(element => element.classList.add('green'));
      document.getElementsByClassName('main-card').forEach(element => element.classList.add('green'));
    }
    this.isStatus = !this.isStatus;
  }

  handlerMouseDown(event) {

  }

  handlerMouseUp() {

  }


  addListenersOnKeys() {
    document.getElementsByClassName('switch')[0].addEventListener("mousedown", (event) => this.handlerSwitch());
    document.addEventListener("mousedown", (event) => this.handlerMouseDown(event));
    document.addEventListener("mouseup", () => this.handlerMouseUp());
  }

}

window.onload = () => {
  const page = new Page();
  page.createPage();
  page.addListenersOnKeys();
};