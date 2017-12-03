const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

//csv converter module
const csvjson = require('csvjson');

//algolia api to upload data to be indexed
const algoliasearch = require('algoliasearch');

//algolia secrets
const applicationId = 'BYAMNN0H16';
const apiKey = 'df7062298c712bb60acc38d2ecfdee8c';

const client = algoliasearch(applicationId, apiKey);
const index = client.initIndex('restaurants');

//import helper function
const updatePaymentOptions = require('./helperfunc');

//converting CSV data into string for module
const csvData = fs.readFileSync(
  path.join(__dirname, 'restaurants_info.csv'),
  { encoding: 'utf8' }
);

//options for removing the :|,
const options = {
  delimiter: /[;|,]+/
};

//converting string into array of objects
const formattedData = csvjson.toObject(csvData, options);

// see the formated csv data
// console.log(formattedData);

// accessing json data in this file
const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'restaurants_list.json'), {
    encoding: 'utf8'
  })
);

//see the json data
// console.log('json data', jsonData)

// manipulate the JSON data

// to remove the payment methods and change to discover using helper functions
const updatedJson = updatePaymentOptions(jsonData, { log: true });
// change the stars?

const settings = {
  searchableAttributes: [
    'name',
    'food_type',
    'city',
    'area',
    'country',
    'postal_code',
    'state',
    'neighborhood'
  ],
  attributesForFaceting: ['food_type', 'stars_count', 'acceptable_payments']
};

//setting the search settings
index.setSettings(settings, err => {
  !err
    ? console.log(chalk.red('Sucessfully set settings!'))
    : console.log(chalk.red(err));
});

// add  CSV data to algolia index
index.addObjects(formattedData, (err, content) => {
  !err
    ? console.log(
        `Successfully added ${chalk.red('CSV')} data into algolia ${chalk.cyan(
          index.indexName
        )} index:`,
        content
      )
    : console.log(chalk.red(err));
});

// update to algolia index with json data
index.partialUpdateObjects(updatedJson, (err, content) => {
  !err
    ? console.log(
        `Successfully updated with ${chalk.red(
          'JSON'
        )} data into algolia ${chalk.cyan(index.indexName)} index:`,
        content.objectIDs
      )
    : console.log(chalk.red(err));
});


//notes

//find out why csv data goes faster than json data?

// headers = ['objectID','food_type','stars_count','reviews_count','neighborhood','phone_number','price_range','dining_style']

//can also implement batching if number of items is higher than 1000 ?

// search settings
//should be able to search by name, food_type and location(city, area)
//filter/facetting by food_type, stars_count, acceptable_payments

// from algolia website, goog to set settings before pushing the data
// https://www.algolia.com/doc/api-reference/api-methods/set-settings/
