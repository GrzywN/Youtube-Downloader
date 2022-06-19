import ErrorHandler from './modules/Utility/ErrorHandler.mjs';
import DOMElements from './modules/Utility/DOMElements.mjs';

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
