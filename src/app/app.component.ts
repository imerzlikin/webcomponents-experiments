import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SimpleWebComponentComponent} from "./simple-web-component/simple-web-component.component";
import {platformBrowser} from "@angular/platform-browser";
import {SimpleCustomElementsService} from "./services/simple-custom-elements.service";
import {AngularCustomElementService} from "./services/angular-custom-element.service";
import {RemoteCustomElementService} from "./services/remote-custom-element.service";
import {AngularComponentService} from "./services/angular-component.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('webComponentContainer', {read: ElementRef, static: true}) wcContainer!: ElementRef<HTMLElement>;

  private _alwaysNew = false;
  loadMax = 50;

  set alwaysNew(alwaysNew: boolean) {
    this._alwaysNew = alwaysNew;

    this.simpleCustomElements.alwaysNew = alwaysNew;
    this.angularCustomElements.alwaysNew = alwaysNew;
    this.remoteCustomElements.alwaysNew = alwaysNew;
  };

  get alwaysNew(): boolean {
    return this._alwaysNew;
  }

  constructor(
    readonly angularComponents: AngularComponentService,
    readonly simpleCustomElements: SimpleCustomElementsService,
    readonly angularCustomElements: AngularCustomElementService,
    readonly remoteCustomElements: RemoteCustomElementService,
    private readonly renderer: Renderer2,
  ) {
    this.angularCustomElements.component = SimpleWebComponentComponent;
  }

  ngOnInit() {
    this.simpleCustomElements.init(this.wcContainer.nativeElement, this.renderer);
    this.angularCustomElements.init(this.wcContainer.nativeElement, this.renderer);
    this.remoteCustomElements.init(this.wcContainer.nativeElement, this.renderer);
  }

  destroyAngular(): void {
    platformBrowser().destroy();
  }
}
