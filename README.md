# Cover-Tech-Challenge

Using the​ ​`Marketcheck Cars Search API​`, build something that can accepts car manufacturer, model and year and searches nearby dealerships for local inventory (within 10 km radius) closest to the user and be able to switch cities (ie, select Montrel over Toronto). Bonus points for calculating average price for the user entered and similar vehicles.

### The requirements are:

1. Please do not put your code in a public repository!
2. In the root folder, please include some form of README so we know how to fire it up.
3. Include your name in your project folder, like first-last-date or similar, and upload to your
   preferred, simple service (not iCloud, please). Don't forget to remove any dependencies
   from your folder!
4. You can get your own API key by quickly signing up here:
   `https://www.marketcheck.com/automotive`

   ### In Summary

   Build a JavaScript application, following the story guidelines. Make it look good. Demonstrate your personal front-end style.

## Installation

- Unzip or download the `carfinder_Farjana_Nipa_16/09/2019` folder.

- From the terminal cd into the `carfinder_Farjana_Nipa_16/09/2019` folder directory.

- From this link `https://nodejs.org/en/` download and install nodejs.
- Excecute following command in the terminal

`` `npm i -S react` ``
`` `npm i -S react-dom` ``
`` `npm i -S react-scripts` ``
`` `npm install --save bootstrap` ``
`` `npm install --save reactstrap` ``

- To run the project in `localhost:3000` excecute command

  `` `npm start` ``

## Architecture

### API key:

    * Got APi key from `https://www.marketcheck.com/'
    * The best practise is to put the API key in bash profile but for make it simple I keep it open.
    * This is a free API key so it's have a limitation of 300 requests.
    * If you get a error then you just have to rotate the key.

### Composition

- Home.jsx is the main app component.
- Inside the components folder all other child components.
- To get the data for top city , manufacturer, year The following API is used:
  `"http://marketcheck-prod.apigee.net/v1/search?api_key=" + {ApiKey} + "&radius=10&start=0&rows=0&facets=year%7C0%7C50,make%7C0%7C100,city%7C0%7C100`
- To get the specific manufacturer model the following API is used:

  `"http://marketcheck-prod.apigee.net/v1/search?api_key=" + {ApiKey} + "&radius=10&start=0&rows=0&make=" + {Maker} + "&facets=model%7C0%7C100"`

- To get the search functionalilty the following API is used:
  `"http://marketcheck-prod.apigee.net/v1/search?api_key=" + {ApiKey} + "&year=" + {year} + "&make=" + {make} + "&radius=10&city=" + {city} + "&model=" + {model}`

### Screenshots

- some of the screenshots of how the app is looking in localhost:3000 is given in this folder.

[![Build Status](https://travis-ci.com/nipa04/carfinder-app.svg?branch=master)](https://travis-ci.com/nipa04/carfinder-app)
