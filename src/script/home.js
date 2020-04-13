import '../style/style.scss';

class Page {
  constructor() {
    this.isStatus = false;
  }

  createKeyboard() {
    const body = document.querySelector('body');
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');

    this.appcontainer = document.createElement("div");
    this.appcontainer.classList.add("app-container");

    this.header = document.createElement("div");
    this.header.classList.add("header-container");
    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.container.classList.add("main-container");

    this.navigation = document.createElement("nav");
    this.navigation.classList.add("navigation");
    this.switch = document.createElement("div");
    this.switch.classList.add("switch-container");
    this.header.append(this.navigation);
    this.header.append(this.switch);
    this.appcontainer.append(this.header);
    this.appcontainer.append(this.container);
    this.root.append(this.appcontainer);
    body.prepend(this.root);
  }

}

window.onload = () => {
  const page = new Page();
  page.createKeyboard();

};