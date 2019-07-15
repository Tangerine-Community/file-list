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
      },
      value: {
        type: String,
        reflect: true
      }
    }
  }

  constructor() {
    super()
    this.endpoint = ''
    this.files = []
    // WARNING: Do not set value in constructor if attribute is reflected. Thiw will result in empty attributes when otherwise set on load.
    //this.value = ''
  }

  firstUpdated() {
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

  async fetchFiles() {
    const that = this
    let reqListener = function () {
      if (that.hasAttribute('value') && that.getAttribute('value')) {
        that.files = JSON.parse(this.responseText).map(file => {
          return {
            ...file, 
            selected: (file.selected || that.getAttribute('value').split(',').includes(file.path))
          }
        })
      } else {
        that.files = JSON.parse(this.responseText)
      }
      that.shadowRoot.querySelector('file-list').files = that.files
      that.dispatchEvent(new CustomEvent('load'))
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
    this.value = this.files.reduce((value, file) => file.selected ? `${file.path},${value}` : value, '').slice(0, -1);
    this.dispatchEvent(new Event('change', {bubbles:true}))
  }

}

window.customElements.define('file-list-http', FileListHttp)
