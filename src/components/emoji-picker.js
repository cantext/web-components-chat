import ElementMixin from './element-mixin';
import emojiData from './emojiData';
import EmojiCategory from './emoji-category';
import Emoji from './c-emoji';

const template = document.createElement('template');
template.innerHTML =`
<style>
.sc-emoji-picker {
  position: absolute;
  bottom: 50px;
  right: 0px;
  width: 330px;
  max-height: 215px;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  border-radius: 10px;
  outline: none;
}

.sc-emoji-picker:after {
  content: "";
  width: 14px;
  height: 14px;
  background: white;
  position: absolute;
  bottom: -6px;
  right: 30px;
  transform: rotate(45deg);
  border-radius: 2px;
}

.sc-emoji-picker--content {
  padding: 10px;
  overflow: auto;
  width: 100%;
  max-height: 195px;
  margin-top: 7px;
  box-sizing: border-box;
}



.sc-emoji-picker--emoji {
  margin: 5px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
  font-size: 28px;
  transition: transform 60ms ease-out,-webkit-transform 60ms ease-out;
}

.sc-emoji-picker--emoji:hover {
  transform: scale(1.4);
}
</style>
<div tab-index="0" class="sc-emoji-picker" >
        <div class="sc-emoji-picker--content">
        </div>
      </div>

`;

export default class EmojiPicker extends ElementMixin {
  constructor() {
    super(template);
  }

  connectedCallback() {
    let $content = this.$('.sc-emoji-picker--content');
    emojiData.map((category) => {
      let $category = document.createElement('emoji-category');
      $category.setAttribute('category', JSON.stringify(category));
      $content.appendChild($category);
      category.emojis.map((emoji) => {
        let $emoji = document.createElement('c-emoji');
        $emoji.setAttribute('emoji', emoji);
        $category.appendChild($emoji);

      });
    });
  }
}

customElements.define('emoji-picker', EmojiPicker);