import ErrorHandler from '../Utility/ErrorHandler.mjs';

class Renderer {
  constructor() {
    ErrorHandler.baseClassCannotBeInstatiated();
  }

  static render(resultItem, node) {
    if (!this.areArgumentsValid(resultItem)) return;
    const element = this.createElement(resultItem);
    this.addListeners(element, resultItem);
    this.appendElement(element, node);
  }

  static areArgumentsValid(resultItem) {
    if (
      resultItem.thumbnailURL != null &&
      resultItem.title != null &&
      resultItem.duration != null &&
      resultItem.id != null
    ) {
      return true;
    } else return false;
  }

  static createElement(resultItem) {
    const element = document.createElement('div');
    element.dataset.id = resultItem.id;
    element.classList.add('block');
    const html = this.getHTMLfromTemplate(resultItem);
    element.innerHTML = html;
    return element;
  }

  static appendElement(element, node) {
    node.appendChild(element);
  }
}

export default Renderer;
