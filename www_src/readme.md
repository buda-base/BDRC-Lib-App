# BDRC Lib

A mobile application for searching through the BDRC library for the status of works.

## Getting Started

The application uses Cordova to achieve cross platform deployment (Android, iOS, & web). The heart of the app is written entirely in React.

All development and deployment modules are installed. 
```
cd www_src
yarn 
```

## Developing (React)

The development configuration is located in the webpack.config.babel.js file. Use the following commands to build the app
with a target of the Cordova www folder

```
cd www_src
npm run dev
```

This builds the app and rebuilds as any source files are changed, 

## Production (React)

Webpack configuration for this command is webpack.config.production.babel.js 
```
npm run build
```


## Phonegap (for web)

Phonegap makes it easy to test the browser version of the app. This helps with a more
rapid development process for non-phone specific features.

Install phonegap:

```
npm install -g phonegap
```

Run the server:

```
phonegap serve -p 3500
```

Now you can view the web version of the app using http://localhost:3500




## Technologies

### For React Dev/Deployment

#### Yarn & npm:
https://www.npmjs.com/
https://yarnpkg.com/en/

#### development tooling
The development tooling consists of a number of tools for preprocessing and building
the app. These include: webpack 2, cssnext/postcss, flow, babel

https://babeljs.io/
https://webpack.js.org/
http://cssnext.io/
https://flow.org/

__JSDoc using documentation.js__
http://documentation.js.org/

__more info on webpack2/cssnext__
https://blog.madewithenvy.com/webpack-2-postcss-cssnext-fdcd2fd7d0bd

__Helpful Sublime Text Plugins__
SublimeLinter
SublimeLinter-flow
SublimeLinter-contrib-eslint
Syntax Highlighting for PostCSS
DocBlockr
Babel
Flow


#### deployment/javascript libraries

__React__
https://facebook.github.io/react/

__Text Encoder/Decoder__
Used after reading in the JSON files into BufferArrays, this library is used to convert them to UTF-8 stings that can be parsed as JSON.

This is a polyfill for the [Encoding Living Standard API for the Web](https://encoding.spec.whatwg.org/), allowing encoding and decoding of textual data to and from Typed Array buffers for binary data in JavaScript.
https://github.com/inexorabletash/text-encoding

__Onsen UI__
Onsen UI is used for the material UI implentation.  For theming, see onsenui_css_theming_tools/css-components-src/readme.md 
https://onsen.io/


__React SpinKit__
https://github.com/KyleAMathews/react-spinkit




### Cordova

#### Plugins

https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/
https://github.com/litehelpers/Cordova-sqlite-storage
https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/

#### Other Info

__IOS Deployment__
https://cordova.apache.org/docs/en/latest/guide/platforms/ios/

__Icon Generation__
https://www.npmjs.com/package/cordova-icon




### NOTES
__Disable CORS in browser__
https://vxlabs.com/2016/03/17/fixing-the-cordova-browser-platform-access-control-allow-origin-error/

/Applications/Chromium.app/Contents/MacOS/Chromium --user-data-dir=/tmp/temp_chrome_user_data --disable-web-security &


