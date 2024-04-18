import {Inject, Injectable, Injector, Renderer2, Type} from "@angular/core";
import {createCustomElement} from "@angular/elements";
import {DOCUMENT} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {catchError, fromEvent, map, Observable, of, race, Subscription, switchMap, tap} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";

@Injectable({
  providedIn: "root"
})
export class WebComponentService {
  private webComponentNames: string[] = [];
  private webComponentElements: HTMLElement[] = [];
  private index = 0;
  private readonly remoteWebComponentUrl = 'http://localhost:4300/main.js';
  private remoteWebComponentScripts: HTMLScriptElement[] = [];
  private remoteWebComponentSubscriptions: Subscription[] = [];

  alwaysNew = false;

  constructor(
    private readonly injector: Injector,
    private readonly httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  generateWebComponentName(): string {
    return `simplewebcomponent-${this.index++}`;
  }

  registerWebComponent(component: Type<any>): string {
    const customElement = createCustomElement(component, {injector: this.injector});
    const name = this.generateWebComponentName();

    if (!customElements.get(name)) {
      customElements.define(name, customElement);
    }

    this.webComponentNames.push(name);

    return name;
  }

  addWebComponent(webComponentName: string, to: HTMLElement, renderer: Renderer2): HTMLElement {
    const webComponentElement = document.createElement(webComponentName);
    this.webComponentElements.push(webComponentElement);
    renderer.appendChild(to, webComponentElement);
    return webComponentElement;
  }

  addRegisteredWebComponents(to: HTMLElement, renderer: Renderer2): void {
    for (const name of this.webComponentNames) {
      this.addWebComponent(name, to, renderer);
    }
  }

  clearWebComponents() {
    if (!this.alwaysNew) {
      this.index = 0;
    }

    this.webComponentNames = [];

    // clear web component elements
    for (const webComponentElement of this.webComponentElements) {
      webComponentElement.remove();
    }
    this.webComponentElements = [];

    // clear web component script elements
    for (const remoteWebComponentScript of this.remoteWebComponentScripts) {
      remoteWebComponentScript.remove();
    }
    this.remoteWebComponentScripts = [];

    // clear subscriptions to web component bundles
    for (const remoteWebComponentSubscription of this.remoteWebComponentSubscriptions) {
      remoteWebComponentSubscription.unsubscribe();
    }
    this.remoteWebComponentSubscriptions = [];
  }

  private _loadWebComponent(): Observable<string> {
    const webComponentName = this.generateWebComponentName();

    this.webComponentNames.push(webComponentName);

    const script = this.createScriptElement(`${this.remoteWebComponentUrl}#${webComponentName}`);

    this.remoteWebComponentScripts.push(script);

    this.document.head.appendChild(script);

    return race(
      fromEvent(script, 'load'),
      fromEvent(script, 'error').pipe(
        switchMap(() => ajax(script.src).pipe(
            map(() => {
              script.setAttribute('data-status', 'error');
              throw new Error('script load error');
            }),
            catchError(err => {
              script.setAttribute('data-status', err.status);
              return of(webComponentName);
            })
          )
        )
      )
    ).pipe(map(() => webComponentName));
  }

  loadWebComponent(to: HTMLElement, renderer: Renderer2): void {
    const subscription = this._loadWebComponent().pipe(
      tap(webComponentName => {
        this.addWebComponent(webComponentName, to, renderer);
      })
    ).subscribe();

    this.remoteWebComponentSubscriptions.push(subscription);
  }

  createScriptElement(url: string): HTMLScriptElement {
    const script = this.document.createElement('script');
    script.setAttribute('defer', 'defer');
    script.setAttribute('src', url);
    return script;
  }
}
