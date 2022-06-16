import DOMElements from './DOMElements.mjs';

class Renderer {
  static linkList;

  static renderElementInList(data) {
    const element = document.createElement('div');
    element.dataset.id = data.videoDetails.videoId;
    element.innerHTML = Renderer.getHTMLFromTemplate(data);
    Renderer.addListeners(element);
    Renderer.appendElementToList(element);
  }

  static getHTMLFromTemplate(data) {
    return `
        <div class="media box is-flex is-align-items-center">
          <div class="media-left">
          <figure class="image thumbnail">
              <img
                class="is-16by9"
                src="${data.videoDetails.thumbnails[2].url}"
                alt="Thumbnail"
              />
          </figure>  
          </div>
          <div class="media-content">
            <p class="title is-size-6 is-centered">${data.videoDetails.title}</p>
          </div>
          <div class="media-right">
            <div class="field">
              <div class="control">
                <button class="button is-small is-link" id="download-item">Download</button>
                <button class="button is-small is-danger" id="remove-item">Remove</button>
                <button class="button is-small is-info" id="edit-item">Edit</button>
              </div>
            </div>
          </div>
        </div>
    `;
  }

  static appendElementToList(element) {
    DOMElements.list.appendChild(element);
  }

  static addListeners(element) {
    // const download = element.querySelector('#download-item');
    const remove = element.querySelector('#remove-item');
    // const edit = element.querySelector('#edit-item');

    // download.addEventListener('click', handler);
    remove.addEventListener('click', Renderer.removeElement.bind(null, element.dataset.id));
    // edit.addEventListener('click', handler);
  }

  static removeElement(id) {
    let element = DOMElements.list.querySelector(`[data-id="${id}"]`);
    Renderer.removeListeners(element);
    DOMElements.list.removeChild(element);
    Renderer.removeFromList(id);
    // kod do usuniecia id z obiektu
  }

  static removeListeners(element) {
    // const download = element.querySelector('#download-item');
    const remove = element.querySelector('#remove-item');
    // const edit = element.querySelector('#edit-item');

    // download.removeEventListener('click', handler);
    remove.removeEventListener('click', Renderer.removeElement.bind(null, element.dataset.id));
    // edit.removeEventListener('click', handler);
  }

  static removeFromList(id) {
    delete this.linkList[id];
  }
}

export default Renderer;
