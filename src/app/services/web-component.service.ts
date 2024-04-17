import {Inject, Injectable, Injector, Renderer2, Type} from "@angular/core";
import {createCustomElement} from "@angular/elements";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class WebComponentService {
  webComponentNames: string[] = [];
  private webComponentElements: HTMLElement[] = [];
  private index = 0;

  constructor(
    private readonly injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  registerWebComponent(component: Type<any>): string {
    const customElement = createCustomElement(component, {injector: this.injector});
    const name = `simple-web-component-${this.index++}`;
    customElements.define(name, customElement);
    this.webComponentNames.push(name);
    return name;
  }

  addWebComponent(webComponentName: string, to: HTMLElement, renderer: Renderer2): HTMLElement {
    const webComponentElement = document.createElement(webComponentName);
    this.webComponentElements.push(webComponentElement);
    renderer.appendChild(to, webComponentElement);
    return webComponentElement;
  }

  clearWebComponents() {
    this.webComponentNames = [];
    for (const webComponentElement of this.webComponentElements) {
      webComponentElement.remove();
    }
    this.webComponentElements = [];
    this.index = 0;
  }
}
