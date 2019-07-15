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
    this.shadowRoot.querySelector('file-list-http').addEventListener('change', this.onChange.bind(this))
    if (this.hasAttribute('endpoint') && this.getAttribute('endpoint') !== '') {
      this.shadowRoot.querySelector('file-list-http').setAttribute('endpoint', this.getAttribute('endpoint'))
    }
    if (this.hasAttribute('value') && this.getAttribute('value') !== '') {
      this.shadowRoot.querySelector('file-list-http').setAttribute('value', this.getAttribute('value'))
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'endpoint' && this.shadowRoot.querySelector('file-list-http')) {
      this.shadowRoot.querySelector('file-list-http').setAttribute('endpoint', this.getAttribute('endpoint'))
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
      <paper-dialog id="dialog">
        <paper-dialog-scrollable>
            <file-list-http></file-list-http>
            <div class="buttons">
              <paper-button id="close-button" dialog-confirm autofocus>OK</paper-button>
            </div>
        </paper-dialog-scrollable>
      </paper-dialog>
    `
  }

  onOpenClick() {
    this.shadowRoot.querySelector('#dialog').open()
  }

  onChange(event) {
    this.files = this.shadowRoot.querySelector('file-list-http').files
    this.value = this.files.reduce((value, file) => file.selected ? `${file.path},${value}` : value, '').slice(0, -1);
    this.dispatchEvent(new Event('change'), {bubbles:true})
  }

}

window.customElements.define('file-list-select', FileListSelect)
