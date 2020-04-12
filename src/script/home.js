let welcome = require('./welcome');
welcome("Suka!");


class Page {
  constructor() {
    this.isStatus = false;
  }

  createKeyboard() {
    const ROOT = document.getElementById("root");
    this.APPCONTAINER = document.createElement("div");
    this.APPCONTAINER.classList.add("app-container");

    this.HEADER = document.createElement("div");
    this.HEADER.classList.add("header-container");
    this.CONTAINER = document.createElement("div");
    this.CONTAINER.classList.add("container");
    this.CONTAINER.classList.add("main-container");

    this.NAVIGATION = document.createElement("nav");
    this.NAVIGATION.classList.add("navigation");
    this.SWITCH = document.createElement("div");
    this.SWITCH.classList.add("switch-container");
    this.HEADER.append(this.NAVIGATION);
    this.HEADER.append(this.SWITCH);
    this.APPCONTAINER.append(this.HEADER);
    this.APPCONTAINER.append(this.CONTAINER);
    ROOT.append(this.APPCONTAINER);
  }

}

window.onload = () => {
  const page = new Page();
  page.createKeyboard();

};