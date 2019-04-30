// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBGFhmHJyc43qE4xb4dv20Udxso5WgxfxY',
    authDomain: 'blog-app-7feeb.firebaseapp.com',
    databaseURL: 'https://blog-app-7feeb.firebaseio.com',
    projectId: 'blog-app-7feeb',
    storageBucket: 'blog-app-7feeb.appspot.com',
    messagingSenderId: '12735490759'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
