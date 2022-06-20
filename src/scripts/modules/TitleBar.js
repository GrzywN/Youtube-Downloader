import ErrorHandler from './Utility/ErrorHandler.js';
import DOMElements from './Utility/DOMElements.js';

class TitleBar {
  constructor() {
    ErrorHandler.classCannotBeInstatiated();
  }

  static init() {
    this.setListeners();
  }

  static setListeners() {
    const closeAppBoundFn = TitleBar.closeApp.bind(this);

    DOMElements.closeApp.addEventListener('click', closeAppBoundFn);
  }

  static closeApp() {
    window.close();
  }
}

export default TitleBar;
