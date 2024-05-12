import {Inject, Injectable, Injector} from "@angular/core";
import {AbstractCustomElementService} from "./abstract-custom-element.service";
import {catchError, fromEvent, map, of, race, switchMap} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import {HttpClient} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class RemoteCustomElementService extends AbstractCustomElementService {
  batchSize = 10;

  private readonly remoteWebComponentUrl = 'http://localhost:4300/main.js';
  private remoteWebComponentScripts: HTMLScriptElement[] = [];

  constructor(
    private readonly httpClient: HttpClient,
    protected override readonly injector: Injector,
    @Inject(DOCUMENT) protected override document: Document
  ) {
    super(injector, document);
  }

  protected registryElement() {
    this.load().subscribe();
  }

  private load() {
    const webComponentName = this.generateName('remote');

    this.customElementNames.push(webComponentName);

    if (this.container && this.renderer) {
      this.appendElement(webComponentName, this.container, this.renderer);
    }

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

  private createScriptElement(url: string) {
    const script = this.document.createElement('script');
    script.setAttribute('defer', 'defer');
    script.setAttribute('src', url);
    return script;
  }

  override clear() {
    super.clear();

    for (const remoteWebComponentScript of this.remoteWebComponentScripts) {
      remoteWebComponentScript.remove();
    }
    this.remoteWebComponentScripts = [];
  }
}
