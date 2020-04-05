import ElementMixin from '../../element-mixin';
import messageHistory from '../../messageHistory';
import Message from '../c-message';
import style from './style.css';
import markup from './template.html';

const template = document.createElement('template');
template.innerHTML = `
<style>
${style}
</style>
${markup}
  `;



export default class MessageList extends ElementMixin {
  constructor() {
    super(template);

  }

  static get observedAttributes() {
    return ['new-message', 'new-emoji'];
  }

  connectedCallback() {
    this.messages = [];
    this.name = 'Rajasegar';
    const messageList = (messages) => {
        return messages.map((m) => {
            return `<c-message type="${m.type}" author="${m.author}" message="${m.type === 'text' ? m.data.text : m.data.emoji}"></c-message>`;
        }).join('');
    };
    let $rootEl = this.$('.sc-message-list');
    $rootEl.innerHTML = messageList(this.messages);
  }

  attributeChangedCallback() {
    const msg = this.getAttribute('new-message');
    if (!msg)
      return;
    let {type, author, data} = JSON.parse(msg);
    let rootEl = this.$('.sc-message-list');
    let $message = document.createElement('c-message');
    $message.setAttribute('type', type);
    $message.setAttribute('author', author);
    $message.setAttribute('message', data.text);
    rootEl.appendChild($message);
  }
}
customElements.define('message-list', MessageList);
