import CARDS from './cards.js';

export default class Statistics {
  constructor() {}

  render() {
    this.statistics = document.createElement('div');
    this.statistics.classList.add('container');
    //this.goToTrain();
    //  this.hideSwitch();
    this.getAllWords();
    this.getButtons();

    let table = document.createElement("table");
    table.classList.add('table_sort');
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
        table.append(head);
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
    table.append(tableBody);
    this.statistics.append(table);  
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


  // goToTrain() {
  //   let menu = document.querySelectorAll('.menu');
  //   document.querySelector('.switch-input').setAttribute('checked', '');
  //   for (let i = 0; i < menu.length; i++) {
  //     menu[i].classList.add('green');
  //   }

  //   this.header = document.querySelector('.header-container');
  //   this.switch = document.querySelector('.switch-container');
  //   this.switch.remove();
  //   this.switch = document.createElement("div");
  //   this.switch.classList.add("switch-container");
  //   this.switchLabel = document.createElement("label");
  //   this.switchLabel.classList.add("switch");
  //   this.switch.append(this.switchLabel);
  //   let keyInput = '<input type="checkbox" class="switch-input" checked="">';
  //   this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
  //   keyInput = '<span class="switch-label" data-on="Train" data-off="Play"></span>';
  //   this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
  //   keyInput = '<span class="switch-handle"></span>';
  //   this.switchLabel.insertAdjacentHTML('beforeend', keyInput);
  //   this.header.append(this.switch);
  //   document.querySelector('.switch-container').style.display = 'none';
  // }

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

  isClickOnButtonReset(event) {
    if (event.target.id == ('resetButton')) {
      return true;
    }
  }

  clickOnButtonReset() {
    this.container.remove();
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.appcontainer.append(this.container);
    const statistics = new Statistics(this.container);
    statistics.resetAllWords();
    statistics.createStatistics();
  }

  isClickOnButtonRepeatDifWord(event) {
    if (event.target.id == ('repeatButton')) {
      return true;
    }
  }

  clickOnButtonRepeatDifWord() {
    console.log('click');
    window.location.hash = 'category/action-set-a';
    this.navigation();
    console.log('click' + window.location.hash);
  }

  isClickOnTheadTable(event) {
    if (event.target.classList.contains('tableTh')) {
      return true;
    }
  }

  clickOnTheadTable(event) {
    this.getSortTable(event.target);
  }

}