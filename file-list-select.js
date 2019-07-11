import { LitElement, html } from 'lit-element'
import './file-list-http.js'

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
      endpoint: {
        type: String 
      },
      files: {
        type: Array
      },
      value: {
        type: String
      }
    }
  }

  constructor() {
    super()
    this.endpoint = ''
    this.files = []
    this.value = ''
  }

  connectedCallback() {
    super.connectedCallback()
    this.shadowRoot.addEventListener('change', this.onChange.bind(this))
  }

  onChange() {
    this.dispatchEvent(new Event('change'), {bubbles:true})
  }

  render(){
    return html`
      <file-list-http endpoint="${this.endpoint}"></file-list>
    `
  }

  onChange(event) {
    this.files = this.shadowRoot.querySelector('file-list-http').files
    this.value = this.shadowRoot.querySelector('file-list-http').files.reduce((value, file) => {
      return file.selected 
        ? value === ''
          ? file.path
          : `${value},${file.path}`
        : value
    }, '')
  }

}

window.customElements.define('file-list-select', FileListSelect)
