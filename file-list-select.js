import { LitElement, html } from 'lit-element'
import './file-list.js'
import './file-list-http.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/paper-button/paper-button.js'
import '@polymer/paper-dialog/paper-dialog.js'
/**
 * `file-list-select`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FileListSelect extends LitElement {

  static get properties() {
    return {
      open: {
        type: Boolean
      },
      endpoint: {
        type: String 
      },
      files: {
        type: Array
      },
      value: {
        type: String,
        reflect: true
      }
    }
  }

  constructor() {
    super()
    this.open = false
    this.endpoint = ''
    this.files = []
    // WARNING: Do not set value in constructor if attribute is reflected. Thiw will result in empty attributes when otherwise set on load.
    //this.value = ''
  }

  firstUpdated() {
    // WARNING: LitElement is not reflecting initial attribute of value to the value property. 
    if (this.getAttribute('value') !== this.value) {
      this.value = this.getAttribute('value')
    }
  }

  render(){
    return html`
      <style>
        #close-button {
          background-color: var(--close-button-background-color, #CCC)
        }
        #open-button {
          background-color: var(--open-button-background-color, #CCC);
        }
      </style>
      <paper-button id="open-button" @click=${this.onOpenClick}>
        <iron-icon icon="view-list"></iron-icon> Select files
      </paper-button>
      ${this.value}
      <paper-dialog id="dialog">
        <paper-dialog-scrollable>
            <div id="file-list-container"></div>
            <div class="buttons">
              <paper-button id="close-button" @click=${this.onCloseClick} dialog-confirm autofocus>OK</paper-button>
            </div>
        </paper-dialog-scrollable>
      </paper-dialog>
    `
  }

  onOpenClick() {
    this.shadowRoot.querySelector('#file-list-container').innerHTML = `
      <file-list-http endpoint="${this.endpoint}" value="${this.value}"></file-list-http>
    `
    this.shadowRoot.querySelector('file-list-http').addEventListener('change', this.onChange.bind(this))
    this.shadowRoot.querySelector('#dialog').open()
  }

  onCloseClick() {
    this.shadowRoot.querySelector('file-list-http').removeEventListener('change', this.onChange.bind(this))
    this.shadowRoot.querySelector('#file-list-container').innerHTML = ``
    this.dispatchEvent(new Event('change', {bubbles:true}))
  }

  onChange(event) {
    event.stopPropagation()
    this.files = this.shadowRoot.querySelector('file-list-http').files
    this.value = this.files.reduce((value, file) => file.selected ? `${file.path},${value}` : value, '').slice(0, -1);
  }

}

window.customElements.define('file-list-select', FileListSelect)
