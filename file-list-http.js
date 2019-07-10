import { LitElement, html } from 'lit-element'
import './file-list.js'

/**
 * `file-list-http`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FileListHttp extends LitElement {

  static get properties() {
    return {
      endpoint: {
        type: String 
      },
      files: {
        type: Array
      }
    }
  }

  constructor() {
    super()
    this.endpoint = ''
    this.files = []
  }

  connectedCallback() {
    super.connectedCallback()
    this.shadowRoot.addEventListener('change', this.onChange.bind(this))
    if (this.hasAttribute('endpoint') && this.getAttribute('endpoint') !== '') {
      this.fetchFiles()
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'endpoint') {
      this.fetchFiles()
    }
  }

  onChange() {
    this.dispatchEvent(new Event('change'), {bubbles:true})
  }

  async fetchFiles() {
    const that = this
    let reqListener = function () {
      that.files = JSON.parse(this.responseText)
      that.shadowRoot.querySelector('file-list').files = that.files
      that.dispatchEvent(new Event('change'), {bubbles:true})
    }
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", this.getAttribute('endpoint'));
    oReq.send();
  }

  render(){
    return html`
      <file-list></file-list>
    `
  }

  onChange(event) {
    this.files = this.shadowRoot.querySelector('file-list').files
  }

}

window.customElements.define('file-list-http', FileListHttp)
