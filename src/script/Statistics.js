import CARDS from './cards.js';

export default class Statistics {
  constructor(statistics) {
    this.statistics = statistics;
  }

  createStatistics() {
    this.hideSwitch();
    this.getAllWords();
    console.log(this.allWords);
    let table = document.createElement("table");
    table.classList.add('table_sort');
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < this.allWords.length; i++) {
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
        headCellText = document.createTextNode('Error rate');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);
        table.append(head);
      } else {
        let row = document.createElement('tr');
        let cell = document.createElement('td');
        let cellText = document.createTextNode(this.allWords[i].word);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.allWords[i].translation);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.allWords[i].countTrain);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.allWords[i].guessPlay);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.allWords[i].ErrorsPlay);
        cell.append(cellText);
        row.append(cell);

        cell = document.createElement('td');
        cellText = document.createTextNode(this.allWords[i].rate);
        cell.append(cellText);
        row.append(cell);

        tableBody.append(row);
      }
    }
    table.append(tableBody);
    this.statistics.append(table);
    this.getButtons();
    document.addEventListener('DOMContentLoaded', () => {

      const getSort = ({ target }) => {
          const order = (target.dataset.order = -(target.dataset.order || -1));
          const index = [...target.parentNode.cells].indexOf(target);
          const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
          const comparator = (index, order) => (a, b) => order * collator.compare(
              a.children[index].innerHTML,
              b.children[index].innerHTML
          );
          
          for(const tBody of target.closest('table').tBodies)
              tBody.append(...[...tBody.rows].sort(comparator(index, order)));
  
          for(const cell of target.parentNode.cells)
              cell.classList.toggle('sorted', cell === target);
      };
      
      document.querySelectorAll('table').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
      
  });
  }


  getButtons() {
    let keyValue = '<div class="buttons"><a href="#" class="button">Reset</a> <a href="#" class="button">Repeat difficult words</a></div>';
    document.querySelector('.container').insertAdjacentHTML('afterbegin', keyValue);
  }

  hideSwitch() {
    document.querySelector('.switch-container').style.display = 'none';
  }

  getAllWords() {
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
  }

  resetAllWords() {
    this.allWords = [];
    CARDS.forEach((keyCategory, numCategory) => {
      if (numCategory != 0) {
        CARDS[numCategory].forEach((key) => {
          let bufWord = key.word;
          let translation = key.translation;
          this.allWords.push({
            word: bufWord,
            translation: translation,
            countTrain: 0,
            guessPlay: 0,
            ErrorsPlay: 0,
            rate: 0,
          });
          localStorage.setItem('allWords', JSON.stringify(this.allWords));
        });
      }
    });

  }

}