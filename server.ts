// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';
const fs = require('fs');
const compression = require('compression');
const params = require('./server.parameters');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// console.log("Port:", params.use_ssl);


// redirect all http to https if ssl is enabled
if (params.use_ssl) {
  // set up a route to redirect http to https
  let http = express();

  http.get('*', function (req, res) {
    res.redirect(`https://${params.domain}:${params.https_port}` + req.url)
  });

  // have it listen on 8080
  http.listen(params.http_port);
}


// Express server
const app = express();

app.use(compression({filter: shouldCompress}));

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
// app.get('/api/*', (req, res) => {
//   res.status(404).send('data requests are not supported');
// });

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});


function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

///
if (params.use_ssl) {
  const credentials = {
    key: fs.readFileSync(params.certificate.key_path, 'utf8'),
    cert: fs.readFileSync(params.certificate.crt_path, 'utf8')
  };

  const httpsServer = require('https').createServer(credentials, app);
  httpsServer.listen(params.https_port, () => {
    console.log(`Listening on https://localhost:${params.https_port}`);
  });
} else {
  app.listen(params.http_port, () => {
    console.log(`Listening on http://localhost:${params.http_port}`);
  });
}
