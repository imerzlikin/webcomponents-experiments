import {Component, OnDestroy} from '@angular/core';
import {AppModule} from "./app.module";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  count = Math.floor(Math.random() * 1000);

  constructor(private service: AppService) {
    console.log("Remote Web Component :: AppComponent :: constructor", AppModule.webComponentName, this.count, service.count);
  }

  ngOnDestroy() {
    console.log("Remote Web Component :: AppComponent :: ngOnDestroy", AppModule.webComponentName, this.count, this.service.count);

    // destroyPlatform();
  }
}
