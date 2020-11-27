import { cards } from "../cards";

export default function renderMainPage(isMode) {
  const mainPage = createDomNode(
    mainPage,
    "div",
    "container",
    "main-container"
  );
  if (isMode) {
    cards.forEach((key, index) => {
      if (index == 0) {
        return;
      }
      const link = "./assets/" + key[1].image;
      const name = cards[0][index - 1].name;
      const id = cards[0][index - 1].id;
      const keyValue = `<a class="main-card green"  href="#category/${id}"><img src="${link}" alt="${name}">${name}</a>`;
      mainPage.insertAdjacentHTML("beforeend", keyValue);
    });
  } else {
    cards.forEach((key, index) => {
      if (index == 0) {
        return;
      }
      const link = "./assets/" + key[1].image;
      const name = cards[0][index - 1].name;
      const id = cards[0][index - 1].id;
      const keyValue = `<a class="main-card"  href="#category/${id}"><img src="${link}" alt="${name}">${name}</a>`;
      mainPage.insertAdjacentHTML("beforeend", keyValue);
    });
  }
  return mainPage;
}

function createDomNode(node, element, ...classes) {
  node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}
