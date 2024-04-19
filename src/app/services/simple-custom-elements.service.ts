import {Injectable} from "@angular/core";
import {AbstractCustomElementService} from "./abstract-custom-element.service";

@Injectable({
  providedIn: "root"
})
export class SimpleCustomElementsService extends AbstractCustomElementService {
  batchSize = 10000;

  protected registryElement() {
    const name = this.generateName('simple');

    super.registerElement(name,
      class extends HTMLElement {
        constructor() {
          super();
        }

        connectedCallback() {
          const count = Math.floor(Math.random() * 1000);
          this.innerHTML = `<p>${name} works! ${count}</p>`
        }
      }
    )
  }
}
