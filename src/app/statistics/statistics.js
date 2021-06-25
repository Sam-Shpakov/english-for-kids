import { cards } from "../cards";
import { createDomNode } from "../common";

export default function renderStatistics(isMode, updateStatistic) {
  const statistics = createDomNode(statistics, "div", "container");
  const allWords = getAllWords();
  statistics.insertAdjacentHTML("afterbegin", getButtons());
  const table = createDomNode(table, "table", "table_sort");
  let tableBody = createDomNode(tableBody, "tbody");
  for (let i = 0; i < allWords.length; i++) {
    if (i === 0) {
      const headName = {
        word: "Word",
        translation: "Translate",
        countTrain: "Clicks in Train",
        guessPlay: "Guess in Play",
        ErrorsPlay: "Errors in Play",
        rate: "Error rate",
      };
      let head = document.createElement("thead");
      let row = isMode
        ? createDomNode(row, "tr", "green")
        : createDomNode(row, "tr");

      head.append(getRow(row, "th", headName, "tableTh"));
      table.append(head);
    }
    let row = document.createElement("tr");
    tableBody.append(getRow(row, "td", allWords[i]));
  }
  table.append(tableBody);
  statistics.append(table);

  statistics.addEventListener("click", (event) =>
    handlerClick(event, updateStatistic)
  );

  return statistics;
}

function getButtons() {
  return `<div class="buttons">
  <a href="#" id="resetButton" class="buttonStatistics">Reset</a>
  <a href="#" id="repeatButton" class="buttonStatistics">Repeat difficult words</a>
  </div>
  <span class="buf"></span>
  <div class="helper">
  <p>Для сортировки нажмите на заголовок столбца</p></div>`;
}
function getRow(row, selector, word, classes) {
  row.append(getCell(word.word, selector, classes));
  row.append(getCell(word.translation, selector, classes));
  row.append(getCell(word.countTrain, selector, classes));
  row.append(getCell(word.guessPlay, selector, classes));
  row.append(getCell(word.ErrorsPlay, selector, classes));
  row.append(getCell(word.rate, selector, classes));
  return row;
}

function getCell(word, selector, classes) {
  let cell = createDomNode(cell, selector, classes);
  cell.innerHTML = word;

  return cell;
}

function getAllWords() {
  return JSON.parse(localStorage.getItem("allWords"));
}

function handlerClick(event, updateStatistic) {
  if (isClickOnButtonReset(event)) {
    clickOnButtonReset(event, updateStatistic);
  }

  if (isClickOnButtonRepeatDifWord(event)) {
    clickOnButtonRepeatDifWord(event);
  }

  if (isClickOnTheadTable(event)) {
    clickOnTheadTable(event);
  }
}

function isClickOnButtonReset(event) {
  return event.target.id === "resetButton";
}

function clickOnButtonReset(event, updateStatistic) {
  event.preventDefault();
  resetAllWords();
  updateStatistic();
}

function isClickOnButtonRepeatDifWord(event) {
  return event.target.id === "repeatButton";
}

function clickOnButtonRepeatDifWord(event) {
  event.preventDefault();
  window.location.hash = "#category/difficult";
}

function isClickOnTheadTable(event) {
  if (event.target.classList.contains("tableTh")) {
    return true;
  }
}

function clickOnTheadTable(event) {
  getSortTable(event.target);
}

function resetAllWords() {
  const allWords = [];
  cards.forEach((keyCategory, numCategory) => {
    if (numCategory != 0) {
      cards[numCategory].forEach((key) => {
        let bufWord = key.word;
        let translation = key.translation;
        allWords.push({
          word: bufWord,
          translation: translation,
          countTrain: 0,
          guessPlay: 0,
          ErrorsPlay: 0,
          rate: 0,
        });
        localStorage.setItem("allWords", JSON.stringify(allWords));
      });
    }
  });
}

function getSortTable(target) {
  const order = (target.dataset.order = -(target.dataset.order || -1));
  const index = [...target.parentNode.cells].indexOf(target);
  const collator = new Intl.Collator(["en", "ru"], {
    numeric: true,
  });
  const comparator = (index, order) => (a, b) =>
    order *
    collator.compare(b.children[index].innerHTML, a.children[index].innerHTML);

  for (const tBody of target.closest("table").tBodies) {
    tBody.append(...[...tBody.rows].sort(comparator(index, order)));
  }

  for (const cell of target.parentNode.cells)
    cell.classList.toggle("sorted", cell === target);
}
