import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

console.log("Remote Web Component :: main.ts", AppModule.webComponentName);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
