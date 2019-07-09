import { LitElement, html } from 'lit-element';
import '@polymer/paper-item/paper-icon-item.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/image-icons.js';

/**
 * `file-list`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FileList extends LitElement {
  render(){
    return html`
      <div>
       Toolbar
      </div>
      ${this.files.map(file => html`
        <paper-icon-item>
           
          ${file.type === 'image' ? html`<iron-icon icon="image:photo" slot="item-icon"></iron-icon>` : ``}
          ${file.type === 'audio' ? html`<iron-icon icon="image:audiotrack" slot="item-icon"></iron-icon>` : ``}
          <paper-item-body two-line>
            <div>${file.path}</div>
            <div secondary>${file.type}</div>
          </paper-item-body>
        </paper-icon-item>
      `)}

    `;
  }
  static get properties() {
    return {
      files: {
        type: Array,
        value: [],
      },
    };
  }
}

window.customElements.define('file-list', FileList);
