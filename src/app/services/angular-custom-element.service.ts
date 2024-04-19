import {Injectable, Type} from "@angular/core";
import {AbstractCustomElementService} from "./abstract-custom-element.service";
import {createCustomElement} from "@angular/elements";

@Injectable({
  providedIn: "root"
})
export class AngularCustomElementService extends AbstractCustomElementService {
  batchSize = 1000;
  component?: Type<any>;

  protected registryElement() {
    if (this.component) {
      const name = this.generateName('angular');
      const customElement = createCustomElement(this.component, {injector: this.injector});

      super.registerElement(name, customElement);
    }
  }
}
