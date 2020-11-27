import { cards } from "./cards";
import { Header } from "./header";
import { createDomNode } from "./common";
import { renderMainPage } from "./main-page";
import { Category } from "./category";
import { Statistics } from "./statistics";
import { renderFooter } from "./footer";

import "../style/index.scss";

export default class App {
  constructor() {
    this.isMode = true;
  }

  initApp() {
    this.body = document.querySelector("body");
    this.root = createDomNode(this.root, "div", "root");
    this.root.id = "root";

    this.appcontainer = createDomNode(
      this.appcontainer,
      "div",
      "app-container"
    );

    this.container = createDomNode(this.container, "div", "category-container");
    this.footer = createDomNode(this.footer, "div", "footer-container");
    this.appendAppElement();
    this.navigate();
    this.allWords = this.getWords();
  }

  addListeners() {
    window.addEventListener("hashchange", () => this.navigate());
  }

  appendAppElement() {
    const header = new Header();
    this.appcontainer.prepend(
      header.getHeader(this.switchMode.bind(this), this.isMode)
    );
    this.appcontainer.append(this.container);
    this.appcontainer.append(this.footer);
    this.footer.append(renderFooter(this.isMode));
    this.root.append(this.appcontainer);
    this.body.prepend(this.root);
  }

  navigate() {
    let path = this.parsePath();
    this.removeContainer();
    switch (path[0]) {
      case "": {
        this.container.innerHTML = "";
        this.showSwitch();
        this.container.append(renderMainPage(this.isMode));
        break;
      }
      case "category": {
        this.moveToCategory(path[1]);
        break;
      }
      case "statistics": {
        this.moveToStatistics();
        break;
      }
    }
  }

  removeContainer() {
    let containerRemove = document.querySelector(".container");
    if (containerRemove != null) {
      containerRemove.remove();
    }
  }

  parsePath() {
    let path = window.location.hash.slice(1);
    let result = path.split("/");
    return result;
  }

  moveToCategory(path) {
    this.showSwitch();
    if (path == "difficult") {
      let arrayCategory = this.getDifficultWords();
      this.category = new Category(this.isMode);
      this.container.append(this.category.render(arrayCategory));
    } else {
      let indexCategory = this.searchIndexCategoryById(path);
      let arrayCategory = cards[indexCategory].slice();
      this.category = new Category(this.isMode);
      this.container.append(this.category.render(arrayCategory));
    }
  }

  getDifficultWords() {
    let bufAllWords = JSON.parse(localStorage.getItem("allWords"));
    bufAllWords.sort((a, b) => b.rate - a.rate);
    let difficultWords = bufAllWords.slice(0, 8);
    let flag = 0;
    difficultWords.forEach((key, index) => {
      if (key.rate == 0 && flag == 0) {
        difficultWords = difficultWords.slice(0, index);
        flag = 1;
      }
    });
    let updateDifficultWords = [];
    this.searchCardDifficultWord(difficultWords[0].word);
    difficultWords.forEach((key) => {
      updateDifficultWords.push(this.searchCardDifficultWord(key.word));
    });

    return updateDifficultWords;
  }

  searchCardDifficultWord(word) {
    let result = {};
    cards.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        cards[numCategory].forEach((key) => {
          if (key.word == word) {
            result = key;
          }
        });
      }
    });
    return result;
  }

  moveToStatistics() {
    this.hideSwitch();
    const statistics = new Statistics();
    this.appcontainer.append(statistics.render());
  }

  searchIndexCategoryById(id) {
    let result;
    cards[0].forEach((key, index) => {
      if (key.id == id) {
        result = index + 1;
      }
    });
    return result;
  }

  switchMode() {
    const indexCategory = this.searchIndexCategoryByPath();
    this.isMode = !this.isMode;
    switch (indexCategory) {
      case 0: {
        this.container.innerHTML = "";
        this.container.append(renderMainPage(this.isMode));
        this.footer.innerHTML = "";
        this.footer.append(renderFooter(this.isMode));
        break;
      }
      default: {
        this.category.switchModeInCategory();
        this.footer.innerHTML = "";
        this.footer.append(renderFooter(this.isMode));
      }
    }
  }

  searchIndexCategoryByPath() {
    let result = -1;
    let path = this.parsePath();
    if (path.length == 1) {
      result = 0;
    } else {
      cards[0].forEach((key, index) => {
        if (key.id == path[1]) {
          result = index + 1;
        }
      });
    }
    return result;
  }

  hideSwitch() {
    document.querySelector(".switch-container").style.display = "none";
  }

  showSwitch() {
    document.querySelector(".switch-container").style.display = "block";
  }

  checkLocalStorage() {
    this.allWords = JSON.parse(localStorage.getItem("allWords"));
    if (this.allWords == null) {
      this.createLocalStorage();
    }
  }

  getWords() {
    if (!localStorage.getItem("allWords")) {
      return this.createWords();
    }
    return JSON.parse(localStorage.getItem("allWords"));
  }

  createWords() {
    const words = cards.slice(1).flatMap((category) =>
      category.map(({ word, translation }) => ({
        word,
        translation,
        countTrain: 0,
        guessPlay: 0,
        ErrorsPlay: 0,
        rate: 0,
      }))
    );

    localStorage.setItem("allWords", JSON.stringify(words));

    return words;
  }
}
