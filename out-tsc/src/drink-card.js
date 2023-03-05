import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import "@lrnwebcomponents/meme-maker/meme-maker.js";
let DrinkCard = class DrinkCard extends LitElement {
    constructor() {
        super(...arguments);
        // Title and image
        this.drink_title = "Sugar-Free Red Bull";
        this.drink_imageurl = "https://www.webstaurantstore.com/images/products/large/322422/2333053.jpg";
        // Properties
        this.drink_brand = "Red Bull GmbH";
        this.drink_price = 2.99;
        this.drink_size = 8.4;
        this.drink_color = "Clear";
        this.drink_calories = 15;
        this.drink_background = false;
        this.details_shown = true;
    }
    /*_new() {
      var clone = this.shadowRoot?.getElementById('card')?.cloneNode(true);
      if (clone) {
        (clone as Element).classList.add('dupecard');
        (clone as Element).children[3].addEventListener('click', this._details);
        this.shadowRoot?.getElementById('cards')?.appendChild(clone);
      }
    }
    _info() {
      // Show form -- on form submit call below function
      var form = this.shadowRoot?.querySelector('.form-bg');
      if (form) { form.setAttribute("style", "z-index: 1; display: block;"); }
    }
    info() {
      // Change/keep clone info
      var index = (<HTMLInputElement>this.shadowRoot?.getElementById('form_index')).value;
      var url = this.shadowRoot?.getElementById('form_url');
      var title = this.shadowRoot?.getElementById('form_title');
      var brand = this.shadowRoot?.getElementById('form_brand');
      var price = this.shadowRoot?.getElementById('form_price');
      var size = this.shadowRoot?.getElementById('form_size');
      var color = this.shadowRoot?.getElementById('form_color');
      var calories = this.shadowRoot?.getElementById('form_calories');
      if (url && (<HTMLInputElement>url).value != '') {
        this.drink_imageurl = (<HTMLInputElement>url).value;
      }
      if (title && (<HTMLInputElement>title).value != '') {
        this.drink_title = (<HTMLInputElement>title).value;
      }
      if (brand && (<HTMLInputElement>brand).value != '') {
        this.drink_brand = (<HTMLInputElement>brand).value;
      }
      if (price && (<HTMLInputElement>price).value != '') {
        this.drink_price = Number((<HTMLInputElement>price).value);
      }
      if (size && (<HTMLInputElement>size).value != '') {
        this.drink_size = Number((<HTMLInputElement>size).value);
      }
      if (color && (<HTMLInputElement>color).value != '') {
        this.drink_color = (<HTMLInputElement>color).value;
      }
      if (calories && (<HTMLInputElement>calories).value != '') {
        this.drink_calories = Number((<HTMLInputElement>calories).value);
      }
      // Reset and hide form
      var form = this.shadowRoot?.querySelector('.form-bg');
      if (form) {
        (<HTMLFormElement>form.children[0].children[0]).reset();
        form.setAttribute("style", "z-index: -1; display: none;");
      }
    }
    _delete() {
      var dupecards = this.shadowRoot?.querySelectorAll('.dupecard');
      console.log(dupecards);
      if (dupecards) { this.shadowRoot?.getElementById('cards')?.removeChild(dupecards[dupecards.length - 1]); }
    }*/
    _details(event) {
        if (event.target) {
            var _target = event.target;
            var desc = _target.previousElementSibling;
            if (desc) {
                if (window.getComputedStyle(desc).display == "none") {
                    desc.setAttribute("style", "display: ");
                    this.details_shown = true;
                }
                else {
                    desc.setAttribute("style", "display: none");
                    this.details_shown = false;
                }
            }
        }
    }
    _title(event) {
        if (event.target) {
            var title = event.target;
            if (title) {
                (title.innerHTML == "Clicked") ? title.innerHTML = this.drink_title : title.innerHTML = "Clicked";
            }
        }
    }
    _background(event) {
        this.drink_background = true;
    }
    background(event) {
        this.drink_background = false;
    }
    render() {
        return html `
      <div id="card" class="card">
        <slot name="image">
          <meme-maker 
            @mousedown=${this._background}
            @mouseup=${this.background}
            image-url="${this.drink_imageurl}" 
            id="image"
            >          
          </meme-maker>
        </slot>
        <slot name="title"><h1 @click=${this._title} id="title">${this.drink_title}</h1></slot>
        <div id="description" slot="description">
          <slot name="brand"><p>Brand: ${this.drink_brand}</p></slot>
          <slot name="price"><p>Price: $${this.drink_price}</p></slot>
          <slot name="size"><p>Size: ${this.drink_size}oz</p></slot>
          <slot name="color"><p>Color: ${this.drink_color}</p></slot>
          <slot name="calories" style="margin-bottom: 8px;"><p>Calories: ${this.drink_calories}</p></slot>
        </div>
        <button @click=${this._details} id="details" class="button">details</button>
      </div>
    `;
    }
};
DrinkCard.styles = css `
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');
    
    :root {
      --drinkbg: "white";
    }
    *[drink_background] {
      background-color: var(--drinkbg)
    }

    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
      max-width: 300px !important;
      min-width: 300px !important;
      margin: 8px 8px;
      text-align: center;
      font-family: 'Lato', sans-serif;
    }
    .card meme-maker {
      width: 100%;
      margin: 10px 0px;
    }
    .card h1 {
      margin: 0 !important;
      padding: 12px 12px;
      font-weight: 400;
      font-size: 30px;
      overflow-y: hidden;
      overflow-x: hidden;
    }
    .card p {
      margin: 2px 2px;
      font-weight: 300;
    }
    .card > .button {
      display: inline-block;
      visibility: hidden;
    }

    .button {
      background-color: #2895e8; /* Blue */
      border: none;
      color: white;
      padding: 8px 2vw;
      text-align: center;
      text-decoration: none;
      font-size: 14px;
      margin-top: 4px;
      margin-bottom: 8px;
      cursor: pointer;
      border-radius: 4px;
      width: 25%;
      transform: scale(1);
      transition: 0.6s;
    }
    .button:hover,
    .button:focus {
      transform: scale(1.05);
      box-shadow: 0px 0px 48px 10px rgba(40, 149, 232, 0.7);
    }

    @media (min-width: 501px) and (max-width: 800px) {
      .card > .button {
        visibility: visible;
      }
    }
    @media (max-width: 500px) {
      .card {
        transform: scale(1.1);
      }
    }
  `;
__decorate([
    property({ type: String, reflect: true })
], DrinkCard.prototype, "drink_title", void 0);
__decorate([
    property({ type: String })
], DrinkCard.prototype, "drink_imageurl", void 0);
__decorate([
    property({ type: String })
], DrinkCard.prototype, "drink_brand", void 0);
__decorate([
    property({ type: Number })
], DrinkCard.prototype, "drink_price", void 0);
__decorate([
    property({ type: Number })
], DrinkCard.prototype, "drink_size", void 0);
__decorate([
    property({ type: String, reflect: true })
], DrinkCard.prototype, "drink_color", void 0);
__decorate([
    property({ type: Number })
], DrinkCard.prototype, "drink_calories", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DrinkCard.prototype, "drink_background", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DrinkCard.prototype, "details_shown", void 0);
DrinkCard = __decorate([
    customElement('drink-card')
], DrinkCard);
export { DrinkCard };
//# sourceMappingURL=drink-card.js.map