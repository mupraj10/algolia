const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

//csv converter module
const csvjson = require("csvjson");

const algoliasearch = require("algoliasearch");

//algolia secrets
const applicationId = "BYAMNN0H16";
const apiKey = "df7062298c712bb60acc38d2ecfdee8c";

const client = algoliasearch(applicationId, apiKey);
const index = client.initIndex("test");

//import helper function
const updatePaymentOptions = require("./helperfunc");

// headers = ['objectID','food_type','stars_count','reviews_count','neighborhood','phone_number','price_range','dining_style']

//converting CSV data into string for module
const csvData = fs.readFileSync(
  path.join(__dirname, "restaurants_info_test.csv"),
  { encoding: "utf8" }
);

//options for removing the :|,
const options = {
  delimiter: /[;|,]+/
};

//converting string into array of objects
const formattedData = csvjson.toObject(csvData, options);

// see the formated data
// console.log(formattedData);

// add CSV data to algolia index
index.addObjects(formattedData, (err, content) =>
  console.log(
    `Successfully added ${chalk.red("CSV")} into algolia ${chalk.cyan(
      index.indexName
    )} index:`,
    content
  )
);

// accessing json data in this file
const jsonData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "restaurants_list_test.json"), {
    encoding: "utf8"
  })
);

//see the data
// console.log('json data', jsonData)

// manipulate the JSON data
// to remove the payment methods and change to discover using helper functions
const updatedJson = updatePaymentOptions(jsonData, { log: true });
// change the stars?

// add json data to algolia index
index.addObjects(updatedJson, (err, content) =>
  console.log(
    `Successfully added ${chalk.red("JSON")}  data into algolia ${chalk.cyan(
      index.indexName
    )} index:`,
    content.objectIDs
  )
);


