// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Client ID and API key from the Developer Console
  CLIENT_ID: '536077714758-t6topsrfcn0v80plcgakd9tnvss8hqbu.apps.googleusercontent.com',
  API_KEY: 'AIzaSyCNSsG7Sl-5-iqiT2QHrleMlpIaJmHkGVk',  
  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES: 'https://www.googleapis.com/auth/drive.metadata.readonly'  
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
