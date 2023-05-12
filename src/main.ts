import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'
import { provideRouter } from '@angular/router'
import routeConfig from './app/routes'
import { provideHttpClient } from "@angular/common/http";

// platformBrowserDynamic().bootstrapModule(AppComponent)
//   .catch(err => console.error(err));

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      provideHttpClient()],

  })
  .catch(err => console.error(err));

