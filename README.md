# Jarvis

Just a Rather Very Intelligent System

<img src="http://ericsteinborn.com/github-for-cats/img/ironcat.png">

# Set up

* NodeJS setup: https://nodejs.org/en/download/
```
$ npm install -g protractor
```

* Open screen 1 for selenium server, refer to [protractor(setup)](http://www.protractortest.org/#/tutorial#setup):
```
$ webdriver-manager update
$ webdriver-manager start
```

* Open screen 2 for running case, refer to [protractor(write a test)](http://www.protractortest.org/#/tutorial#step-0-write-a-test):
```
$ git clone git@github.com:yallenh/Jarvis.git
$ cd Jarvis
$ protractor conf.js
```
* Currently in experimental stage, should modify `spec.js` for your own usage.
