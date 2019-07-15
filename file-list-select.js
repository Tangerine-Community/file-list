import { LitElement, html } from 'lit-element'
import './file-list.js'
import './file-list-http.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/paper-button/paper-button.js'

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
        :host() {
          position: inline;
        }
        :host([open]) {
          position: fixed;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,.4);
        }
        #open-button {
          visibility: visible;
        }
        :host([open]) #open-button {
          visibility: hidden;
        }
        #modal {
          visibility: hidden;
          width: 80%;
          margin: 35px;
          padding: 35px;
          background: #FFF;
          border-radius: 15px;

        } 
        :host([open]) #modal {
          visibility: visible;
        }
        #modal-contents {
          position: relative;
        }
        #close-button {
          position: absolute;
          top: -45px;
          right: -66px;
        }
        #open-button {
          background-color: var(--open-button-background-color, #CCC);
        }
      </style>
      <paper-button id="open-button" @click=${this.onOpenClick}>
        <iron-icon icon="view-list"></iron-icon> Select files
      </paper-button>
      <div id="modal">
        <div id="modal-contents">
          <paper-button id="close-button" @click=${this.onCloseClick}>
            <iron-icon icon="close"></iron-icon>
          </paper-button>
          <file-list-http></file-list-http>
        </div>
      </div>
    `
  }

  onOpenClick() {
    this.setAttribute('open', '')
  }

  onCloseClick() {
    this.removeAttribute('open', '')
  }

  onChange(event) {
    this.files = this.shadowRoot.querySelector('file-list-http').files
    this.value = this.files.reduce((value, file) => file.selected ? `${file.path},${value}` : value, '').slice(0, -1);
    this.dispatchEvent(new Event('change'), {bubbles:true})
  }

}

window.customElements.define('file-list-select', FileListSelect)
