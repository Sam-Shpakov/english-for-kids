import { cards } from "./cards";
import { Header } from "./header";
import { createDomNode, updateNode } from "./common";
import { renderMainPage } from "./main-page";
import { Category } from "./category";
import { renderStatistics } from "./statistics";

import "../style/index.scss";

export default class App {
  constructor() {
    this.isMode = true;
    this.category = new Category();
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
    this.root.append(this.appcontainer);
    this.body.prepend(this.root);
  }

  navigate() {
    let path = this.parsePath();
    switch (path[0]) {
      case "": {
        updateNode(this.container, renderMainPage, this.isMode);
        break;
      }
      case "category": {
        this.moveToCategory(path[1]);
        break;
      }
      case "statistics": {
        updateNode(
          this.container,
          renderStatistics,
          this.isMode,
          this.updateStatistic.bind(this)
        );
        break;
      }
    }
  }

  parsePath() {
    let path = window.location.hash.slice(1);
    let result = path.split("/");
    return result;
  }

  moveToCategory(path) {
    if (path === "difficult") {
      this.arrayCategory = this.getDifficultWords();
      this.container.innerHTML = "";
      this.container.append(
        this.category.render(this.arrayCategory, this.isMode)
      );
    } else {
      this.arrayCategory = cards[this.searchIndexCategoryById(path)].slice();
      this.container.innerHTML = "";
      this.container.append(
        this.category.render(this.arrayCategory, this.isMode)
      );
    }
  }

  getDifficultWords() {
    let bufAllWords = JSON.parse(localStorage.getItem("allWords"));
    bufAllWords.sort((a, b) => b.rate - a.rate);
    let difficultWords = bufAllWords.slice(0, 8);
    let flag = 0;
    difficultWords.forEach((key, index) => {
      if (key.rate === 0 && flag === 0) {
        difficultWords = difficultWords.slice(0, index);
        flag = 1;
      }
    });
    let updateDifficultWords = [];
    if (difficultWords.length !== 0) {
      this.searchCardDifficultWord(difficultWords[0].word);
      difficultWords.forEach((key) => {
        updateDifficultWords.push(this.searchCardDifficultWord(key.word));
      });
    }

    return updateDifficultWords;
  }

  searchCardDifficultWord(word) {
    let result = {};
    cards.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        cards[numCategory].forEach((key) => {
          if (key.word === word) {
            result = key;
          }
        });
      }
    });
    return result;
  }

  updateStatistic() {
    updateNode(
      this.container,
      renderStatistics,
      this.isMode,
      this.updateStatistic.bind(this)
    );
  }

  searchIndexCategoryById(id) {
    let result;
    cards[0].forEach((key, index) => {
      if (key.id === id) {
        result = index + 1;
      }
    });
    return result;
  }

  switchMode() {
    const indexCategory = this.searchIndexCategoryByPath();
    this.isMode = !this.isMode;
    switch (indexCategory) {
      case -1: {
        updateNode(this.container, renderStatistics, this.isMode);
        break;
      }
      case 0: {
        updateNode(this.container, renderMainPage, this.isMode);
        break;
      }
      default: {
        this.container.innerHTML = "";
        this.container.append(
          this.category.render(this.arrayCategory, this.isMode)
        );
      }
    }
  }

  searchIndexCategoryByPath() {
    let result = -2;
    let path = this.parsePath();
    if (path[0] === "statistics") {
      result = -1;
    } else if (path.length === 1) {
      result = 0;
    } else {
      cards[0].forEach((key, index) => {
        if (key.id === path[1]) {
          result = index + 1;
        }
      });
    }
    return result;
  }

  checkLocalStorage() {
    this.allWords = JSON.parse(localStorage.getItem("allWords"));
    if (this.allWords === null) {
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
