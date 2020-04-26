import CARDS from './cards.js';

export default class Statistics {
  constructor(isMode, navigate) {
    this.isMode = isMode;
    this.navigate = navigate;
    this.numberErrors = 0; 
  }

  render() {
    this.statistics = document.createElement('div');
    this.statistics.classList.add('container');
    this.getAllWords();
    this.getButtons();
    this.table = document.createElement("table");
    this.table.classList.add('table_sort');
    let tableBody = document.createElement("tbody");
    for (let i = 0; i < this.allWords.length; i++) {
      if (i == 0) {
        let head = document.createElement("thead");
        let row = document.createElement("tr");
        let headCell = document.createElement('th');
        headCell.classList.add('tableTh');
        headCell.setAttribute('title', 'Нажми для сортировки');
        let headCellText = document.createTextNode('Word');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCell.classList.add('tableTh');
        headCell.setAttribute('title', 'Нажми для сортировки');
        headCellText = document.createTextNode('Translate');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCell.classList.add('tableTh');
        headCell.setAttribute('title', 'Нажми для сортировки');
        headCellText = document.createTextNode('Clicks in mode Train');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCell.classList.add('tableTh');
        headCell.setAttribute('title', 'Нажми для сортировки');
        headCellText = document.createTextNode('Guess in mode Play');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCell.classList.add('tableTh');
        headCell.setAttribute('title', 'Нажми для сортировки');
        headCellText = document.createTextNode('Errors in mode Play');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);

        headCell = document.createElement('th');
        headCell.classList.add('tableTh');
        headCell.setAttribute('title', 'Нажми для сортировки');
        headCellText = document.createTextNode('Error rate');
        headCell.append(headCellText);
        row.append(headCell);
        head.append(row);
        this.table.append(head);
      }
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
    this.table.append(tableBody);
    this.statistics.append(this.table);  

    this.statistics.addEventListener('click', (event) => this.handlerClick(event));

    return this.statistics;
  }

  handlerClick(event) {
    if (this.isClickOnButtonReset(event)) {
      this.clickOnButtonReset();
    }

    if (this.isClickOnButtonRepeatDifWord(event)) {
      this.clickOnButtonRepeatDifWord();
    }

    if (this.isClickOnTheadTable(event)) {
      this.clickOnTheadTable(event);
    }
  }

  isClickOnButtonReset(event) {
    if (event.target.id == ('resetButton')) {
      return true;
    }
  }

  clickOnButtonReset() {
    event.preventDefault();
    this.statistics.remove();
    
    this.resetAllWords();
    document.querySelector('.app-container').append(this.render());
  }

  isClickOnButtonRepeatDifWord(event) {
    if (event.target.id == ('repeatButton')) {
      return true;
    }
  }

  clickOnButtonRepeatDifWord() {
    event.preventDefault();
    window.location.hash = '#category/difficult';
  }

  isClickOnTheadTable(event) {
    if (event.target.classList.contains('tableTh')) {
      return true;
    }
  }

  clickOnTheadTable(event) {
    this.getSortTable(event.target);
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

  getSortTable(target) {
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], {
      numeric: true
    });
    const comparator = (index, order) => (a, b) => order * collator.compare(
      b.children[index].innerHTML,
      a.children[index].innerHTML
    );

    for (const tBody of target.closest('table').tBodies)
      tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    for (const cell of target.parentNode.cells)
      cell.classList.toggle('sorted', cell === target);
  }

  getButtons() {
    let keyValue = '<div class="helper"><p>Для сортировки нажмите на заголовок столбца</p></div>';
    this.statistics.insertAdjacentHTML('afterbegin', keyValue);
    keyValue = '<span class="buf"></span>';
    this.statistics.insertAdjacentHTML('afterbegin', keyValue);
    keyValue = '<div class="buttons"><a href="#" id="resetButton" class="buttonStatistics">Reset</a> <a href="#" id="repeatButton" class="buttonStatistics">Repeat difficult words</a></div>';
    this.statistics.insertAdjacentHTML('afterbegin', keyValue);
  }

  getAllWords() {
    this.allWords = JSON.parse(localStorage.getItem('allWords'));
  }
}