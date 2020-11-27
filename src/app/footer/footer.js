import { cards } from "../cards";

export default class Footer {
  getFooter() {
    this.footer = document.createElement("div");
    this.footer.classList.add("footer-container");

    return this.footer;
  }
}
