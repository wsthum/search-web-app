# Simple search web application using Express, Angular 8 and NodeJS
This repository contains three main sections - testing, frontend and backend. Since the three .json files have been provided, the typical NoSQL database MongoDB component is skipped since queries can be made directly using the files so that data can be retrieved by the means of simple file reads. By going through this guide, you'll understand how to:
* Run unit tests and integration tests for backend using Mocha and Chai library before starting individual components using Mocha via npm
* Start the backend NodeJS/Express server using node via npm
* Serve the Angular 8 app using the standard command line angular interface @angular/cli via npm

## Getting Started (Setting Up Environment)
These steps need to be done sequentially for them to work as intended.

### Installing NodeJS and the npm Javascript package manager
Go to https://nodejs.org/en/download/ to download the latest version of of node for your operating system. With the proper installation of node, the npm package manager will also be installed on your machine.
When the installation is done, type the below command on the command line to verify if Node and npm are installed:
```
node -v
npm -v
```

### Installing the Angular Command Line Interface
With the npm package manager installed, type the below command on the command line to install the Angular command line interface globally on your machine using npm, for more information you can visit https://cli.angular.io/:
```
npm install -g @angular/cli
```

### Git cloning and installing required libraries in NodeJS/Express
Git clone this repository and then cd into the root folder containing the main backend server file - server.js together with the subdirectories config, public, server and test. After making sure you are in the right directory on the command line, run the following command to install all the specified packages in package.json:
```
npm install
```
After running this command, you should see a node_modules directory in the root folder containing all the installed libraries. This ensures that all the required libraries for the backend server to run are installed.

### Installing required libraries in Angular 
After installing the backend libraries, we need to install the libraries for Angular. cd into the public folder, this is where all the frontend code is kept. Along with the src and e2e subdirectory, you will see another package.json file, this contains all the needed libraries for the frontend. Making sure the command line is in the public directory, run:
```
npm install
```
Another node_modules directory should appear in the public directory. The frontend libraries are now downloaded.

## Running the tests and web application
After the above steps are finally done (whew!), we can finally run our app. 

### Test runner
For the purposes of this project, only backend unit tests and integration tests for the API route, services and controllers are included in the Mocha and Chai framework and they are contained in the /test folder in the root directory. Frontend test frameworks in Jasmine, Karma and Protractor are included in the public/e2e folder by default when setting up an Angular are not implemented since this project is a single page app and there are time constraints.

In the root folder, which the server.js file is located, run:
```
npm test
```
This will run the Mocha tests automatically and the passed and failed test cases should show on the command line. If all the steps are completed and the libraries are installed, the tests should all pass.

### Starting the backend of the web application
In the root folder containing the server.js file, run:
```
npm start
```
This starts the backend server and you should see the output on the command line below:

![](https://github.com/wsthum/search-web-app/blob/master/screenshots/backendnpmStart.jpg)

### Starting the frontend of the web application
After starting the backend server, cd into the public folder. Once you make sure that you are in the public folder.
Run the same command below again:
```
npm start
```
This will start the angular cli to serve the frontend files. It takes a while to render the files so please wait for a while. The output on the command line will look like this when that's done:

![](https://github.com/wsthum/search-web-app/blob/master/screenshots/frontendnpmStart.jpg)

## Using the application
With the test completed and the frontend and backend server, we can now start using the application! 
If you go to http://localhost:4200, you will see the single page web application below.

![](https://github.com/wsthum/search-web-app/blob/master/screenshots/mainAppUI.jpg)

You can now select the data type (organizations, users or tickets), the key and value you want to query for and submit, then the results will appear below the submit button, more details about this can be found on the page.

![](https://github.com/wsthum/search-web-app/blob/master/screenshots/mainAppQuery.jpg)

The mandatory fields are data type and key field, if those are not selected, error messages will show.

![](https://github.com/wsthum/search-web-app/blob/master/screenshots/mainAppError.jpg)






