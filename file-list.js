import { LitElement, html } from 'lit-element'
import '@polymer/paper-item/paper-icon-item.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/editor-icons.js'

/**
 * `file-list`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FileList extends LitElement {

  static get properties() {
    return {
      // Should be an array of objects with path, type, size, and selected properties.
      files: {
        type: Array
      }
    }
  }

  constructor() {
    super()
    this.files = []
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.onClick.bind(this)) 
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this.onClick.bind(this)) 
  }

  onClick(event) {
    // Traverse the DOM to find the parent node with attribute of data-path.
    const path = event.composedPath()
    let nodeWithPath = path.find(node => node.hasAttribute && node.hasAttribute('data-path'))
    if (nodeWithPath) {
      this.files = [...this.files.map(file => file.path === nodeWithPath.getAttribute('data-path') ? {...file, selected: file.selected ? false : true} : file)]
      this.dispatchEvent(new Event('change', {bubbles:true}))
    }
  }

  render(){
    return html`
      <style>
        .file[selected] {
          background: var(--selected-background, #CCC) !important
        }
        .file[focused]:not([selected])::before {
          background: var(--focus-not-selected-background, transparent) !important
        }
        .file div[secondary] {
          color: #AAA
        }
      </style>
      ${this.files.map(file => html`
        <paper-icon-item class='file' data-path="${file.path}" ?selected="${file.selected}">
          ${file.type === 'image' ? html`<iron-icon icon="image:photo" slot="item-icon"></iron-icon>` : ``}
          ${file.type === 'audio' ? html`<iron-icon icon="image:audiotrack" slot="item-icon"></iron-icon>` : ``}
          ${!file.type ? html`<iron-icon icon="editor:insert-drive-file" slot="item-icon"></iron-icon>` : ``}
          <paper-item-body two-line>
            <div>${file.path}</div>
            <div secondary>${file.size}</div>
          </paper-item-body>
        </paper-icon-item>
      `)}
    `
  }

}

window.customElements.define('file-list', FileList)
