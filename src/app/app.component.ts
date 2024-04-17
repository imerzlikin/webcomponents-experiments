import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {SimpleWebComponentComponent} from "./simple-web-component/simple-web-component.component";
import {WebComponentService} from "./services/web-component.service";
import {platformBrowser} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('webComponentContainer', {read: ElementRef, static: true}) wcContainer!: ElementRef<HTMLElement>;

  showAngularComponents = false;
  angularComponents: number[] = [];

  private readonly componentsTotal = 10000;

  constructor(
    private readonly sws: WebComponentService,
    private readonly renderer: Renderer2,
  ) {
  }

  private addWebComponent(name: string): void {
    this.sws.addWebComponent(
      name,
      this.wcContainer.nativeElement,
      this.renderer
    );
  }

  private registerWebComponent(): string {
    return this.sws.registerWebComponent(
      SimpleWebComponentComponent
    );
  }

  addWebComponents(): void {
    for (const name of this.sws.webComponentNames) {
      this.addWebComponent(name);
    }
  }

  registerWebComponents(): void {
    for (let i = 0; i < this.componentsTotal; i++) {
      this.registerWebComponent();
    }
  }

  clearWebComponents(): void {
    this.sws.clearWebComponents();
  }

  destroyAngular(): void {
    platformBrowser().destroy();
  }

  allOnce() {
    this.registerWebComponents();
    this.addWebComponents();
    this.clearWebComponents();
    this.destroyAngular();
  }

  addAngularComponents(): void {
    this.showAngularComponents = true;
    for (let i = 0; i < this.componentsTotal; i++) {
      this.angularComponents.push(i);
    }
  }

  clearAngularComponents() {
    this.showAngularComponents = false;
    this.angularComponents = [];
  }

  ngAfterViewInit() {
  }
}
