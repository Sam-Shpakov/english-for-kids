import { cards } from "../cards";
import { createDomNode } from "../common";

export default class Header {
  getHeader(switchMode, isMode) {
    this.switchMode = switchMode;
    this.isMode = isMode;
    this.header = createDomNode(this.header, "div", "header-container");
    this.navigation = createDomNode(this.navigation, "div", "navigation");
    this.menuToggle = createDomNode(this.menuToggle, "div", "menu-toggle");
    this.menuCheckbox = createDomNode(this.menuCheckbox, "input");
    this.menuCheckbox.type = "checkbox";
    this.menuSpan1 = createDomNode(this.menuSpan1, "span");
    this.menuSpan2 = createDomNode(this.menuSpan2, "span");
    this.menuSpan3 = createDomNode(this.menuSpan2, "span");
    this.isMode
      ? (this.menu = createDomNode(this.menu, "ul", "menu", "green"))
      : (this.menu = createDomNode(this.menu, "ul", "menu"));

    this.switch = createDomNode(this.switch, "div", "switch-container");
    this.switchLabel = createDomNode(this.switchLabel, "label", "switch");

    this.appendMenuElement();
    this.bindEvents();

    return this.header;
  }

  appendMenuElement() {
    this.navigation.append(this.menuToggle);
    this.menuToggle.append(this.menuCheckbox);
    this.header.append(this.navigation);
    this.header.append(this.switch);
    this.menuToggle.append(this.menuSpan1);
    this.menuToggle.append(this.menuSpan2);
    this.menuToggle.append(this.menuSpan3);
    this.menuToggle.append(this.menu);
    this.switch.append(this.switchLabel);

    let keyInput = '<a class="menu-item active" href="#">Main Page</a>';
    this.menu.insertAdjacentHTML("beforeend", keyInput);
    cards[0].forEach((item) => {
      if (item.id != "statistics") {
        const keyValue = `<a class="menu-item" href="#category/${item.id}">${item.name}</a>`;
        this.menu.insertAdjacentHTML("beforeend", keyValue);
      }
    });
    keyInput = `<a class="menu-item" href="#statistics">Statistics</a>`;
    this.menu.insertAdjacentHTML("beforeend", keyInput);

    keyInput = '<input type="checkbox" class="switch-input" checked="">';
    this.switchLabel.insertAdjacentHTML("beforeend", keyInput);
    keyInput =
      '<span class="switch-label" data-on="Train" data-off="Play"></span>';
    this.switchLabel.insertAdjacentHTML("beforeend", keyInput);
    keyInput = '<span class="switch-handle"></span>';
    this.switchLabel.insertAdjacentHTML("beforeend", keyInput);
  }

  bindEvents() {
    document.addEventListener("click", (event) => this.handlerClick(event));
  }

  handlerClick(event) {
    if (this.isBlurMenu(event)) {
      this.blurMenu();
    }

    if (this.isClickOnMenu(event)) {
      this.clickOnMenu(event);
    }

    if (this.isSwitchMode(event)) {
      this.switchMode();
      this.switchModeInMenu(this.isMode);
    }
  }

  isBlurMenu(event) {
    return (
      !event.target.classList.contains("menu") &&
      event.target.tagName !== "INPUT"
    );
  }

  blurMenu() {
    document.querySelector(".menu-toggle>input").checked = false;
  }

  isClickOnMenu(event) {
    if (event.target.classList.length != 0) {
      const { classList, parentNode } = event.target;
      return (
        classList.length &&
        (classList.contains("menu-item") ||
          parentNode.classList.contains("menu-item"))
      );
    }
  }

  clickOnMenu(event) {
    this.controlActiveItem(event);
  }

  controlActiveItem(event) {
    let menuItems = document.querySelectorAll(".menu-item");
    for (let i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove("active");
    }
    event.target.classList.add("active");
  }

  isSwitchMode(event) {
    if (
      event.target.closest(".switch-container") &&
      event.target.tagName !== "INPUT"
    ) {
      return true;
    }
  }

  switchModeInMenu(isMode) {
    if (isMode) {
      this.menu.classList.remove("green");
    } else {
      this.menu.classList.add("green");
    }
    this.isMode = !this.isMode;
  }
}
