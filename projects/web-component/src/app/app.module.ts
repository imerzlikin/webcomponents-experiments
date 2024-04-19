import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from "@angular/elements";

import {AppComponent} from './app.component';
import {AppService} from "./app.service";

let webComponentName = String(new URL((document.currentScript as any).src).hash).slice(1);

console.log("Remote Web Component", webComponentName);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  static webComponentName = webComponentName;

  constructor(private injector: Injector, private service: AppService) {
    console.log("Remote Web Component :: AppModule :: constructor", webComponentName);
  }

  ngDoBootstrap() {
    console.log("Remote Web Component :: AppModule :: ngDoBootstrap", webComponentName);

    if (webComponentName && !customElements.get(webComponentName)) {
      const ce = createCustomElement(AppComponent, {injector: this.injector});
      customElements.define(webComponentName, ce);
    }
  }

  ngOnDestroy() {
    console.log("Remote Web Component :: AppModule :: ngOnDestroy", webComponentName);
  }
}
