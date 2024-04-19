import {Injectable} from "@angular/core";
import {AppModule} from "./app.module";

@Injectable({
  providedIn: "root"
})
export class AppService {
  count = Math.floor(Math.random() * 1000);

  constructor() {
    console.log("Remote Web Component :: AppService :: constructor", AppModule.webComponentName, this.count);
  }
}
