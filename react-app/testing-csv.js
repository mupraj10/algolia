//csv converter 
const fs = require('fs');
const path = require('path');
const chalk = require('chalk')

const csv = require('fast-csv');
const csvjson = require('csvjson');

const algoliasearch = require('algoliasearch');

//algolia secrets 

const applicationId =  'BYAMNN0H16';
const apiKey = 'df7062298c712bb60acc38d2ecfdee8c';

const client = algoliasearch(applicationId, apiKey);
const index = client.initIndex('test');


//JSON obj 
// headers = ['objectID','food_type','stars_count','reviews_count','neighborhood','phone_number','price_range','dining_style']


//converting CSV data into string 
const csvData = fs.readFileSync(path.join(__dirname, 'restaurants_info_test.csv'), {encoding: 'utf8'})

//options for removing the : and/or ,
const options = {
    delimiter: /[;|,]+/
  };

//converting string into array of objects 
const formattedData = csvjson.toObject(csvData, options);

// see the formated data 
// console.log(formattedData);


// add CSV data to algolia index 
index.addObjects(formattedData, (err, content) => console.log(`Successfully added ${chalk.red('CSV')} into algolia ${chalk.cyan(index.indexName)} index:`, content));


// accessing in json data
const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'restaurants_list_test.json'), {encoding: 'utf8'}))

// console.log('json data', jsonData)

// manipulate the JSON data  
    // to remove the payment methods and change to discover 
    // change the stars? 


// add json data to algolia index 
index.addObjects(jsonData, (err, content) => console.log(`Successfully added ${chalk.red('JSON')}  data into algolia ${chalk.cyan(index.indexName)} index:`, content.objectIDs));


