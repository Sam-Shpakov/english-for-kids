import CARDS from './cards.js';

export default class Main {
  constructor(main) {
    this.main = main;
  }

  createMain() {
    CARDS.forEach((key, index) => {
      if(index==0){return;}
      let src = CARDS[index][1];
      let link = './assets/';
      
      for (let keySrc in src) {
        if (keySrc == 'image') {
          link += src[keySrc];
        }
      }
      let keyValue = `<a class="main-card green" href="#/cards"><img src="${link}" alt="${CARDS[0][index-1]}">${CARDS[0][index-1]}</a>`;
      this.main.insertAdjacentHTML('beforeend', keyValue);
    });
  }

  

}