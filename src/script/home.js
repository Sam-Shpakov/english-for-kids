let welcome = require('./welcome');
welcome("Suka!");


class Page {
  constructor() {  
      this.isCapsLock = false;
      this.isShift = false;
  }

  createKeyboard() {
      this.CONTAINER = document.createElement("div");
      this.TEXTAREA = document.createElement("textarea");
      this.KEYBOARD = document.createElement("div");
      this.MANUAL = document.createElement("div");
      const BODY = document.querySelector("body");
      this.KEYBOARD.classList.add("keyboard_container");
      this.CONTAINER.classList.add("container");
      this.MANUAL.classList.add("manual");
      this.CONTAINER.appendChild(this.MANUAL);
      this.CONTAINER.appendChild(this.TEXTAREA);
      this.CONTAINER.appendChild(this.KEYBOARD);
      BODY.appendChild(this.CONTAINER);
  }  
  
}

window.onload = () => {
  const page = new Page();
  page.createKeyboard();

};
