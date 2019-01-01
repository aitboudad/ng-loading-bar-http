# @ngx-loading-bar

A fully automatic loading bar with zero configuration for Angular app (http, http-client and router).

## Packages
- [@ngx-loading-bar/router](./packages/router/README.md) - Display loading bar when navigating between routes.
- [@ngx-loading-bar/http-client](./packages/http-client/README.md) - Display the progress of your `@angular/common/http` requests.
- [@ngx-loading-bar/http](./packages/http/README.md) - Display the progress of your `@angular/http` requests.
- [@ngx-loading-bar/core](./packages/core/README.md) - Core module to manage the progress bar manually.

## Demo
- online demo: https://angular-sypacw.stackblitz.io
- [demo-app](./demo): Example utilizing all @ngx-loading-bar libraries.


Table of contents
=================
  * [Getting started](#getting-started)
    * [1. Install @ngx-loading-bar](#1-install-ngx-loading-bar)
    * [2. Import the installed libraries](#2-import-the-installed-libraries)
    * [3. Include `ngx-loading-bar` in your app component](#3-include-ngx-loading-bar-in-your-app-component)
  * [Ignoring particular requests](#ignoring-particular-requests)
  * [Manually manage loading service](#manually-manage-loading-service)
  * [Integration with Material Progress bar](#integration-with-material-progress-bar)
  * [Credits](#credits)

## Getting started

#### 1. Install @ngx-loading-bar:

```bash
  # if you use `@angular/common/http`
  npm install @ngx-loading-bar/core @ngx-loading-bar/http-client --save

  # if you use `@angular/http`
  npm install @ngx-loading-bar/core @ngx-loading-bar/http --save

  # if you use `@angular/router`
  npm install @ngx-loading-bar/core @ngx-loading-bar/router --save

  # to manage loading-bar manually
  npm install @ngx-loading-bar/core --save
```

#### 2. Import the installed libraries:

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Http import LoadingBarHttpModule:
// import { LoadingBarHttpModule } from '@ngx-loading-bar/http';

// for Router import LoadingBarRouterModule:
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// for Core import LoadingBarModule:
// import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AppComponent } from './app';

@NgModule({
  ...
  imports: [
    ...

    LoadingBarHttpClientModule

    // for Http use:
    // LoadingBarHttpModule,

    // for Router use:
    // LoadingBarRouterModule

    // for HttpClient use:
    // LoadingBarHttpClientModule

    // for Core use:
    // LoadingBarModule.forRoot()
  ],
})
export class AppModule {}
```

#### 3. Include `ngx-loading-bar` in your app component:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    ...
    <ngx-loading-bar></ngx-loading-bar>
  `,
})
export class AppComponent {}

```

## Customize `ngx-loading-bar`

You can pass the following inputs to customize the view:


| Input          | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| color          | The color of loading bar. Default value is `#29d`.             |
| includeSpinner | Hide or show the Spinner. Default value is `true`.             |
| includeBar     | Hide or show the Bar. Default value is `true`.                 |
| height         | The height of loading bar. Default value is `2px`.             |
| diameter       | The diameter of the progress spinner. Default value is `14px`. |
| fixed          | set loading bar on the top of the screen or inside a container. Default value is `true`. |
| value          | Set the value of the progress bar.                             |


## Ignoring particular requests

The loading bar can also be forced to ignore certain requests, for example, when long-polling or periodically sending debugging information back to the server.

#### http-client:
Http client doesn't allow passing [custom option](https://github.com/angular/angular/issues/18155), in order to achieve that we made a temporary solution (by passing the option throught the header) that will be removed once http-client come with a proper solution.

```ts
// ignore a particular $http GET:
httpClient.get('/status', {
  headers: { ignoreLoadingBar: '' }
});
```

#### http:

```ts
// ignore a particular $http GET:
http.get('/status', {
  { headers: new Headers({ ignoreLoadingBar: '' }) }
});
```

## Manually manage loading service 

#### 1. Import the `LoadingBarModule`

```ts
import { NgModule } from '@angular/core';

import { LoadingBarModule } from '@ngx-loading-bar/core';

@NgModule({
  ...
  imports: [
    ...

    LoadingBarModule.forRoot(),
  ],
})
export class AppModule {}
```

#### 2. Inject/Use LoadingBarService

```ts
import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app',
  template: `
    ...
    <ngx-loading-bar></ngx-loading-bar>
    <button (click)="startLoading()">start</button>
    <button (click)="stopLoading()">stop</button>
  `,
})
export class App {
  constructor(private loadingBar: LoadingBarService) {}

  startLoading() {
    this.loadingBar.start();
  }
  
  stopLoading() {
    this.loadingBar.complete();
  }
}
```

## Integration with [Material Progress bar](https://material.angular.io/components/progress-bar/overview)

```ts
import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app',
  template: `
    ...
    <mat-progress-bar mode="determinate" [value]="loader.progress$|async"></mat-progress-bar>
  `,
})
export class App {
  constructor(public loader: LoadingBarService) {}
}
```

# Credits 

- [angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar)
- https://github.com/sir-valentin/Angular2LoadingBar.git
