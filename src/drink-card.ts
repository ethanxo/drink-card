import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('drink-card')
export class DrinkCard extends LitElement {
  static styles = css`
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background-color: #ededed;
    }

    @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
    
    .controls {
      margin: 16px auto;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
    .controls > .button {
      width: 20%;
    }

    .cards {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
      max-width: 300px !important;
      margin: 8px 8px;
      text-align: center;
      font-family: "Roboto Mono", monospace;
    }
    .card img {
      width: 100%;
      margin: 10px 0px;
    }
    .card h2 {
      margin: 0 !important;
      padding: 12px 12px;
    }
    .card p {
      margin: 2px 2px;
    }
    .card > .button {
      display: none;
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
        display: inline-block;
      }
    }
    @media (max-width: 500px) {
      .card {
        transform: scale(1.1);
      }
    }

    .form-bg {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(94, 110, 141, 0.5);
      overflow-y: auto;
      z-index: -1;
      display: none;
    }
    .form {
      background-color: #2694e8;
      border-radius: 10px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      display: flex;
      width: 100%;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      padding: 20px;
      color: #fff;
      text-align: center;
    }
    .form-control {
      margin: 2px 0px;
      width: 50%;
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

  _closeform(event: Event) {
    // Close and reset form if form-bg is clicked
    if ((event.target as Element).classList.contains('form-bg')) {
      var form = this.shadowRoot?.querySelector('.form-bg');
      if (form) { 
        (<HTMLFormElement>form.children[0].children[0]).reset();
        form.setAttribute("style", "z-index: -1; display: none;"); 
      }
    }
  }

  _new() {
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
  }

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
      <div class="controls">
        <button @click=${this._new} class="button">add clone card</button>
        <button @click=${this._info} class="button">change clone details</button>
        <button @click=${this._delete} class="button">delete newest clone</button>
      </div>
      <div id="cards" class="cards">
        <div id="card" class="card">
          <img
            src=${this.drink_imageurl}
            style="max-width:200px"
            id="image"
          />
          <h2 @click=${this._title} id="title">${this.drink_title}</h2>
          <slot id="description">
            <p>Brand: ${this.drink_brand}</p>
            <p>Price: $${this.drink_price}</p>
            <p>Size: ${this.drink_size}oz</p>
            <p>Color: ${this.drink_color}</p>
            <p style="margin-bottom: 8px;">Calories: ${this.drink_calories}</p>
          </slot>
          <button @click=${this._details} id="details" class="button">details</button>
        </div>
      </div>

      <div class="form-bg" @click=${this._closeform}>
        <div class="form">
          <form onsubmit="return false" action="">
            <p>enter nothing to keep an option the same as it currently is</p>
            <input class="form-control" id="form_index" type="text" placeholder="Clone Index (0-...)" />
            <input class="form-control" id="form_url" type="text" placeholder="Image URL" />
            <input class="form-control" id="form_title" type="text" placeholder="Title" />
            <input class="form-control" id="form_brand" type="text" placeholder="Brand Name" />
            <input class="form-control" id="form_price" type="text" placeholder="Price ($)" />
            <input class="form-control" id="form_size" type="text" placeholder="Size (oz)" />
            <input class="form-control" id="form_color" type="text" placeholder="Color" />
            <input class="form-control" id="form_calories" type="text" placeholder="Calories" />
            <button class="form-control" style="width: 51%;" @click=${this.info}>submit</button>
          </form>
        </div>
      </div>
    `;
  }
}
