# Agrista Website

Uses react, react-router, redux and [Phenomic](https://github.com/MoOx/phenomic) under the hood.

This site is 100% serverless! Wooooooo!

# Setup

## Install dependencies

```console
$ npm install
```

Next you will need to change the `.env.sample` to `.env` and input the correct credentials.

Serverless folks our credentials are in 1password secure note in Shared titled: 'Site .env settings'

Once the .env file is configured with the correct API keys you can run the local site.

## Run development server

```console
$ npm start
```

## Build for production

```console
$ npm run build
```

---

## Publishing Updates to Agrista.com

We are using Amazon AWS S3 to distribute the site.

Make sure `npm run build` works locally.


## Adding Custom Scripts

To add custom scripts to page templates you will need to use React Helmet

```js
import Helmet from 'react-helmet'
<Helmet
   script={[
      {'src': 'http://davidwells.io/wp-content/themes/david-wells/js/prism.js', 'type': 'text/javascript'}
   ]}
   link={[
      {'rel': 'stylesheet', 'href': 'http://davidwells.io/wp-content/themes/david-wells/css/prism.css'},
   ]}
 />
```
