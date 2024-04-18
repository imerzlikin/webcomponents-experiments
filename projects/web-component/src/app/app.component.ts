import {Component, OnDestroy} from '@angular/core';
import {AppModule} from "./app.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  count = Math.floor(Math.random() * 1000);

  constructor() {
    console.log("Remote Web Component :: AppComponent :: constructor", AppModule.webComponentName);
  }

  ngOnDestroy() {
    console.log("Remote Web Component :: AppComponent :: ngOnDestroy", AppModule.webComponentName);

    // destroyPlatform();
  }
}
