// to get the data to be indexed by algolia  

//need to combine a csv file and a json object. 

// end result for each restaraunt is to have this object 

//JSON from dataset 

// {"objectID":101422,
// "name":"Town",
// "address":"348 Main Street",
// "area":"Denver / Colorado",
// "city":"Carbondale",
// "country":"US",
// "image_url":"https://www.opentable.com/img/restimages/101422.jpg","mobile_reserve_url":"http://mobile.opentable.com/opentable/?restId=101422",
// "payment_options":["AMEX","Discover","MasterCard","Visa"],
// "phone":"9709636328",
// "postal_code":"81623",
// "price":2,"reserve_url":"http://www.opentable.com/single.aspx?rid=101422",
// "state":"CO",
// "_geoloc":{"lat":39.400235,"lng":-107.210373}}

//CSV file 
// you get this in rows 

// { objectID;
// food_type;
// stars_count;
// reviews_count;
// neighborhood;
// phone_number;
// price_range;
// dining_style }

// need to find a way to combine them to have access to food type

// since payment options are only AMEX/American Express, Visa, Discover, and MasterCard
// need to change Diners Club and Carte Blanche to Discover 