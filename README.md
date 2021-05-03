# BDRC Lib 

A mobile application for searching through the BDRC library for the status of works.

## Getting Started

The application uses Cordova to achieve cross platform deployment (Android, iOS, & web). The heart of the app is written entirely in React.

All development and deployment modules are installed. 
```
npm run install 
```

Make sure to install cordova platforms:

```
cordova platform add browser
cordova platform add ios
cordova platform add android
```


## Development (React/browser)

The development configuration is located in the webpack.config.babel.js file. Use the following commands to build the app
with a target of the Cordova www folder. http://localhost:8080

```
npm run serve
```

## Android dev testing

See console.log output using Chrome

```chrome://inspect/#devices```

This runs the webpack-dev-server, rebuilding and reloading in the browser when a change is made.

## Production

First build the React app:

```
npm run build
```

### Cordova Android dev build

(You will need Android Studio and JDK 1.8)

```
cordova run android
```

NOTE: You may need to set JAVA_HOME if you are running an older JVM by default, like so on MacOS X in the case where you also have JDK 1.8.0.101:
```export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home```

### Cordova Android signed build

cordova run android --release -- --keystore=KEYSTORE.jks --storePassword=STORE_PASSWORD --alias=ALIAS --password=ALIAS_PASSWORD

NOTE: You may need to set JAVA_HOME if you are running a JVM other than 1.8, like so on MacOS X in the case where you also have JDK 1.8.0.152:
```export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_152.jdk/Contents/Home```


### IOS

npm install -g ios-deploy


## Test Searches, easy to type on Tib keyboard:

བཀྲ་ཤིས་

བཀའ་མ

ཞེས་བྱ

using "$" as a prefix will access FTS.


## IMPORTANT DEPLOYMENT NOTE

in config.xml the app id is unfortunately different for iOS and Android.

_Android:_

```id="org.tbrc.bdrclibapp" ```

_iOS:_

```id="io.bdrc.bdrclibapp" ```


You must change these before building production releases.

## linking out rules:

https://github.com/buda-base/public-digital-library/issues/106


## Technologies

### For React Dev/Deployment

#### npm:
https://www.npmjs.com/

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
https://github.com/danwilson/google-analytics-plugin
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/index.html

#### Other Info

__IOS Deployment__
https://cordova.apache.org/docs/en/latest/guide/platforms/ios/

__Icon and Splash Generation__
https://github.com/ionic-team/cordova-res


### NOTES
__Disable CORS in browser__
https://vxlabs.com/2016/03/17/fixing-the-cordova-browser-platform-access-control-allow-origin-error/

/Applications/Chromium.app/Contents/MacOS/Chromium --user-data-dir=/tmp/temp_chrome_user_data --disable-web-security &

__Enable Tib Keyboard__

http://en.ironrabbit.org/howto


### Compile IOS:

There are lines in the plugin-file-transfer that needs to be removed:
https://github.com/apache/cordova-plugin-file-transfer/issues/258
```
By removing lines 107-110 from CDVFileTransfer.m I was able to compile:

    NSString* userAgent = [self.commandDelegate userAgent];
    if (userAgent) {
        [req setValue:userAgent forHTTPHeaderField:@"User-Agent"];
    }
```
## Android Deployment


STEP 1: Update config.xml with the VERSION, the attribute "android-versionCode" and "version" both should be updated, commit these changes.

STEP 2: Update config.xml id attribute to ```org.tbrc.bdrclibapp```

STEP 3: Build the javascript ```npm run build```

STEP 4: open platforms/android/ in Android Studio (Hit Ok to allow gradle installation, also upgrade gradle if needed)

STEP 5. Build / Generate Signed Bundle

STEP 6. select the /Volumes/Data/android/keystores/bdrc.jks and enter the passwords, etc...  NEXT
```
/Volumes/Data/android/keystores/bdrc.jks
```
STEP 7: select release  FINISH. 
_update Gradle plugin if Android Studio requests it_

STEP 8. the android bundle will be placed here:
```
/Volumes/Data/Clients/BDRC/bdrc-lib-app/platforms/android/app/release/app-release.aab
```
