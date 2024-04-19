import {Inject, Injectable, Injector, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export abstract class AbstractCustomElementService {
  protected customElementNames: string[] = [];
  protected customElements: HTMLElement[] = [];

  container?: HTMLElement;
  renderer?: Renderer2;

  protected index = 0;
  abstract batchSize: number;
  maxNewElements = 0;

  get registeredTotal() {
    return this.customElementNames.length;
  }

  get appendedTotal() {
    return this.customElements.length;
  }

  alwaysNew = false;

  protected constructor(
    protected readonly injector: Injector,
    @Inject(DOCUMENT) protected document: Document
  ) {
  }

  protected abstract registryElement(): void;

  protected generateName(suffix: string = '') {
    if (this.maxNewElements > 0) {
      this.index = this.index % this.maxNewElements;
    }

    return `webcomponent-${suffix}${this.index++}`;
  }

  protected registerElement(name: string, component: CustomElementConstructor) {
    if (!customElements.get(name)) {
      customElements.define(name, component);
    }
    this.customElementNames.push(name);
  }

  protected appendElement(name: string, to: HTMLElement, renderer: Renderer2) {
    const webComponentElement = document.createElement(name);
    this.customElements.push(webComponentElement);
    renderer.appendChild(to, webComponentElement);
  }

  init(container: HTMLElement, renderer: Renderer2) {
    this.container = container;
    this.renderer = renderer;
  }

  register(maxNewElements: number = 0) {
    if (maxNewElements > 0) {
      this.maxNewElements = maxNewElements;
    }

    for (let i = 0; i < this.batchSize; i++) {
      this.registryElement();
    }
  }

  append() {
    if (this.container && this.renderer) {
      for (const name of this.customElementNames) {
        this.appendElement(name, this.container, this.renderer);
      }
    }
  }

  clear() {
    if (!this.alwaysNew) {
      this.index = 0;
    }

    this.maxNewElements = 0;

    this.customElementNames = [];

    for (const customElement of this.customElements) {
      customElement.remove();
    }

    this.customElements = [];
  }
}
