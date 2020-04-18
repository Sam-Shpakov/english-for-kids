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
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < this.arrayAllWords.length; i++) {
      if (i == 0) {
        let head = document.createElement("thead");
        let row = document.createElement("tr");
        let headCell = document.createElement('th');
        let headCellText = document.createTextNode('Word');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('Translate');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('Click in mode Train');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('Guess in mode Play');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('Errors in mode Play');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCellText = document.createTextNode('Success rate');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);
        table.append(head);
      } else {
        let row = document.createElement('tr');
        let cell = document.createElement('td');
        let cellText = document.createTextNode(this.arrayAllWords[i].word);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.arrayAllWords[i].translation);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.arrayAllWords[i].countTrain);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.arrayAllWords[i].guessPlay);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.arrayAllWords[i].ErrorsPlay);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.arrayAllWords[i].rate);
        cell.append(cellText);
        row.append(cell);

        tableBody.append(row);
      }
    }
    table.append(tableBody);
    this.statistics.append(table);
  }

  getAllWords(){
    this.arrayAllWords = JSON.parse(localStorage.getItem('arrayAllWords'));
  }
  resetAllWords() {
    this.arrayAllWords = [];
    CARDS.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        CARDS[numCategory].forEach((key, index) => {
          let bufWord = key.word;
          let translation = key.translation;
          this.arrayAllWords.push({
            word: bufWord,
            translation: translation,
            countTrain: 0,
            guessPlay: 0,
            ErrorsPlay: 0,
            rate: 0,
          });
          localStorage.setItem('arrayAllWords', JSON.stringify(this.arrayAllWords));
        });
      }
    });

  }

}