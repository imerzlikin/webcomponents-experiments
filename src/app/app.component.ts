import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {SimpleWebComponentComponent} from "./simple-web-component/simple-web-component.component";
import {WebComponentService} from "./services/web-component.service";
import {platformBrowser} from "@angular/platform-browser";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('webComponentContainer', {read: ElementRef, static: true}) wcContainer!: ElementRef<HTMLElement>;

  showAngularComponents = false;
  angularComponents: number[] = [];

  constructor(
    readonly sws: WebComponentService,
    private readonly renderer: Renderer2,
  ) {
  }

  private registerLocalWebComponent(): string {
    return this.sws.registerWebComponent(SimpleWebComponentComponent);
  }

  addLocalWebComponents(): void {
    this.sws.addRegisteredWebComponents(this.wcContainer.nativeElement, this.renderer);
  }

  registerLocalWebComponents(): void {
    for (let i = 0; i < 1000; i++) {
      this.registerLocalWebComponent();
    }
  }

  clearLocalWebComponents(): void {
    this.sws.clearWebComponents();
  }

  // all actions together for local web-components
  allAtOnce() {
    this.registerLocalWebComponents();
    this.addLocalWebComponents();
    this.clearLocalWebComponents();
    this.destroyAngular();
  }

  addAngularComponents(): void {
    this.showAngularComponents = true;
    for (let i = 0; i < 10000; i++) {
      this.angularComponents.push(i);
    }
  }

  clearAngularComponents() {
    this.showAngularComponents = false;
    this.angularComponents = [];
  }

  destroyAngular(): void {
    platformBrowser().destroy();
  }

  loadRemoteWebComponents() {
    for (let i = 0; i < 10; i++) {
      this.sws.loadWebComponent(this.wcContainer.nativeElement, this.renderer);
    }
  }
}
