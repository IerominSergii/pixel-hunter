import {createElement} from "../util/util";

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    throw new Error(`Template is required`);
  }

  _render() {
    return createElement(this.template);
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this._render();
    this._bind(this._element);
    return this._element;
  }

  _bind() {
    // bind handlers if required
  }
}
