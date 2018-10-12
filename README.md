# cimpress-translations-cli

[![npm version](https://badge.fury.io/js/cimpress-translations-cli.svg)](https://badge.fury.io/js/cimpress-translations-cli)

cimpress-translations-cli is a convenient client for Cimpress' Translations service which can very easily be integrated
into an existing build pipeline to automatically download latest translations for an application.

## Getting Started

Include [cimpress-translations-cli](https://www.npmjs.com/package/cimpress-translations) in your project using npm or yarn:
```
npm i -D cimpress-translations-cli
```

## Supported options
```
  -V, --version                       output the version number
  -a, --application-id <id>           Cimpress Translation Application ID (as defined in https://translations.cimpress.io
  -c, --client-id <id>                Auth0 Client ID that suppors clients_grant.
  -s, --client-secret <secret>        Auth0 Client Secret for the client id.
  -t, --translations-file <filepath>  File where a single file with all languages is created.
  -h, --help                          output usage information
  
  --iso639_1                          Produce language file with 2-letter language codes (eg.: en, de, fr, ...).
```

## Integrate into your build pipeline

The commands below assume (for simplicity) that you have APP_ID, CLIENT_ID and CLIENT_SECRET set as environment variables.
``
##### Running manually to test
```
node ./node_modules/.bin/cimpress-translations-cli -a ${APP_ID} -c ${CLIENT_ID} -s ${CLIENT_SECRET} -t "./src/locales/translations.json"
```

##### Setting in your package.json
```
    ...
    scripts: {
        ...
        "translate": "cimpress-translations-cli -a ${APP_ID} -c ${CLIENT_ID} -s ${CLIENT_SECRET} -t "./src/locales/translations.json",
        ...
    },
    ...
```

###### Steps performed by the client

1. Retrieve access token for CLIENT_ID/CLIENT_SECRET
2. Retrieve application description (including list of languages) from Cimpress Translaions service for application with id APP_ID
3. For each application language from 2), download the language blobs
4. Combine the language blobs into a single json
5. Save the combined language files in the translations file (specified with `-t` option)

