import CARDS from './cards.js';

export default class Statistics {
  constructor(statistics) {
    this.statistics = statistics;
  }

  createStatistics(numCategory) {
    let keyValue = '<div class="rating none"></div>';
    this.statistics.insertAdjacentHTML('beforeend', keyValue);

    this.getAllWords();
    console.log(this.arrayAllWords);
    let table = document.createElement("table");
    table.setAttribute('wight', "100%");
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < this.arrayAllWords.length; i++) {
      if (i == 0) {
        let head = document.createElement("tr");
        let headCell = document.createElement('td');
        let headCellText = document.createTextNode('Word');
        headCell.append(headCellText);
        head.append(headCell);

        headCell = document.createElement('td');
        headCellText = document.createTextNode('Translate');
        headCell.append(headCellText);
        head.append(headCell);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('');
        headCell.append(headCellText);
        head.append(headCell);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('');
        headCell.append(headCellText);
        head.append(headCell);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('');
        headCell.append(headCellText);
        head.append(headCell);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('');
        headCell.append(headCellText);
        head.append(headCell);
      }

      let row = document.createElement("tr");

      for (let j = 0; j < 2; j++) {

        let cell = document.createElement("td");
        let cellText = document.createTextNode("cell in row " + i + ", column " + j);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      tableBody.append(row);
    }
    table.append(tableBody);
    this.statistics.append(table);
    // table.setAttribute("border", "2");
  }

  getAllWords() {
    this.arrayAllWords = [];
    CARDS.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        CARDS[numCategory].forEach((key, index) => {
          this.arrayAllWords.push(key.word);
        });
      }
    });

  }

}