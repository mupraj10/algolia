## Solutions Team Hiring Assignment - Maggy Prajapati

This is my hiring assignment for the Solutions Team at Algolia 👻

You can find the completed project by clicking [here](https://mupraj10.github.io/algolia/) or at https://mupraj10.github.io/algolia/ 

### Communication
- You can find the answers to the example customer questions [here](customer-questions/customer-answers.txt) as a `.txt` file 

### Tech and UX Project 

* You can find an `import-csv-json.js` script file where I combined the CSV and JSON files given [here](resources/dataset/import-csv-json.js).
  * I added a helper function [here](resources/dataset/helperfunc.js) to help create new attribute called `acceptable_payments` to only include AMEX/American Express, Visa, Discover, and MasterCard 
  * I also added an attribute called `adjusted_stars` to get rounded stars value
* Once the data manipulation is over, it sends over the data to the appropriate Algolia index

* From the UI perspective: 
  * Users can search for restaurants, cuisines, or location in the search bar and the appropriate results will be re-rendered and the matched text will be italicized.
  * Users can also filter their searches in which case the filtered item in the sidebar will be highlighted
  * Users have the option to select different food types/cuisines to isolate their search but only 1 rating option and payment option.
  * Users are able to click the show more button that renders 3 new restaurants
  * Users who give permission to access their location can see restaurants closest to them, but if they choose not give access to their location they are directed to NY coordinates.
  * Users will be presented with a loading screen until the appropriate results can be shown.
  * Users can see how long each search takes by the stats presents on the results side. 
  * Users can are see restaurants hits that have a name, photo, rating, neighborhood, review count, price range.
  * Users are able to click on the `reserve on open table` link to direct them to reserving a table at that restaurant. 
  * Users are able to use the website on multiple devices and it should be relatively responsive. 

* In Progress
  * The sidebar is in a table format so getting the highlighting is not very nice looking at the moment.
  * I am still working on making the website more responsive by using more CSS. (maybe implement a library)
  * I began working on a back button to go back to results but haven't quite figured it out yet.
  * Better loading screen
  * Stars on hits are rounded and not accurate to decimals
  * At the moment, facets are restricted return

* Future (if I had more time)
  * Implementing if a user gives a location to render results based on that data
  * Viewing results on a map
  * Scrolling options for the food-types
  * Make it prettier! 



