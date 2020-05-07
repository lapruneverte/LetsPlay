// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAp1D_cp-4YhVo4tJBRmtgY-13yosCq1KQ",
    authDomain: "letsplay-99d2c.firebaseapp.com",
    databaseURL: "https://letsplay-99d2c.firebaseio.com",
    projectId: "letsplay-99d2c",
    storageBucket: "letsplay-99d2c.appspot.com",
    messagingSenderId: "329107847528",
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 import 'zone.js/dist/zone-error';  // Included with Angular CLI.
