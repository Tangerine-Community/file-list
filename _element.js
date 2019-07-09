import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `file-list`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FileList extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'file-list',
      },
    };
  }
}

window.customElements.define('file-list', FileList);
