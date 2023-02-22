import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import "@lrnwebcomponents/meme-maker/meme-maker.js";

@customElement('drink-card')
export class DrinkCard extends LitElement {
  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');

    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
      max-width: 300px !important;
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

  // Title and image
  @property({ type: String }) drink_title = "Sugar-Free Red Bull";
  @property({ type: String }) drink_imageurl = "https://www.webstaurantstore.com/images/products/large/322422/2333053.jpg";
  // Properties
  @property({ type: String }) drink_brand = "Red Bull GmbH";
  @property({ type: Number }) drink_price = 2.99;
  @property({ type: Number }) drink_size = 8.4;
  @property({ type: String }) drink_color = "Clear";
  @property({ type: Number }) drink_calories = 15;
  
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

  _details(event: Event) {
    if (event.target) {
      var _target = event.target as Element;
      var desc = _target.previousElementSibling;
      if (desc) { (window.getComputedStyle(desc).display == "none") ? desc.setAttribute("style", "display: ") : desc.setAttribute("style", "display: none"); }
    }
  }
  _title(event: Event) {
    if (event.target) {
      var title = event.target as Element;
      if (title) { (title.innerHTML == "Clicked") ? title.innerHTML = this.drink_title : title.innerHTML = "Clicked" }
    }
  }

  render() {
    return html`
      <div id="card" class="card">
        <slot name="image">
          <meme-maker 
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
}
