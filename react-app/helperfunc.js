const chalk = require("chalk");

const testJson = [
  {
    objectID: 101422,
    name: "Town",
    address: "348 Main Street",
    area: "Denver / Colorado",
    city: "Carbondale",
    country: "US",
    image_url: "https://www.opentable.com/img/restimages/101422.jpg",
    mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=101422",
    payment_options: ["AMEX", "Discover", "MasterCard", "Diners Club", "Visa"],
    phone: "9709636328",
    postal_code: "81623",
    price: 2,
    reserve_url: "http://www.opentable.com/single.aspx?rid=101422",
    state: "CO",
    _geoloc: { lat: 39.400235, lng: -107.210373 }
  },
  {
    objectID: 113494,
    name: "Plates Kitchen",
    address: "301 Glenwood Ave",
    area: "Raleigh / Durham / Chapel Hill",
    city: "Raleigh",
    country: "US",
    image_url: "https://www.opentable.com/img/restimages/113494.jpg",
    mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=113494",
    payment_options: ["AMEX", "Diners Club", "MasterCard", "Visa"],
    phone: "9198280018x",
    postal_code: "27603",
    price: 2,
    reserve_url: "http://www.opentable.com/single.aspx?rid=113494",
    state: "NC",
    _geoloc: { lat: 35.784585, lng: -78.647982 }
  },
  {
    objectID: 113494,
    name: "P Kitchen",
    address: "301 Glenwood Ave",
    area: "Raleigh / Durham / Chapel Hill",
    city: "Raleigh",
    country: "US",
    image_url: "https://www.opentable.com/img/restimages/113494.jpg",
    mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=113494",
    payment_options: [
      "AMEX",
      "Diners Club",
      "Carte Blanche",
      "MasterCard",
      "Visa"
    ],
    phone: "9198280018x",
    postal_code: "27603",
    price: 2,
    reserve_url: "http://www.opentable.com/single.aspx?rid=113494",
    state: "NC",
    _geoloc: { lat: 35.784585, lng: -78.647982 }
  },
  {
    objectID: 113494,
    name: "Plat",
    address: "301 Glenwood Ave",
    area: "Raleigh / Durham / Chapel Hill",
    city: "Raleigh",
    country: "US",
    image_url: "https://www.opentable.com/img/restimages/113494.jpg",
    mobile_reserve_url: "http://mobile.opentable.com/opentable/?restId=113494",
    payment_options: ["AMEX", "MasterCard", "Visa"],
    phone: "9198280018x",
    postal_code: "27603",
    price: 2,
    reserve_url: "http://www.opentable.com/single.aspx?rid=113494",
    state: "NC",
    _geoloc: { lat: 35.784585, lng: -78.647982 }
  }
];

//helper function that if it has a Diners Club card or a Carte Blanche card it switches it Discover if it doesn't already there

function updatePaymentOptions(jsonObj, log) {
  const updatedJson = [];
  //iterate through the JSON array for each place
  jsonObj.forEach(place => {
    const acceptablePayments = ["AMEX", "MasterCard", "Discover", "Visa"];
    const replacingPayments = ["Diners Club", "Carte Blanche"];

    const currentPaymentOptions = place.payment_options;

    //create a copy of the payment options
    let updatedPayments = currentPaymentOptions.slice();

    // iterate through to find the card types
    replacingPayments.forEach(cardType => {
      //if Diner's club or Carte Blanche is present manipulate
      if (updatedPayments.indexOf(cardType) !== -1) {
        //find in payments array and remove
        const positionInArray = updatedPayments.indexOf(cardType);
        const removed = updatedPayments.splice(positionInArray, 1);

        //if discover is not there add it in
        if (!updatedPayments.includes("Discover")) {
          //   console.log(chalk.green('adding in Discover'));
          updatedPayments.push("Discover");
        }

        //   console.log(
        //     "foundCard",
        //     chalk.blue(cardType),
        //     "at position",
        //     chalk.red(positionInArray),
        //     "removed",
        //     chalk.magenta(removed),
        //     "new payment options",
        //     chalk.red(updatedPayments)
        //   );
      }
      //if does not have Diners club or Carte Blanche it is just a copy same
      //!!! adding in filtering to make sure only those options

      return updatedPayments;
    });

    if (log.log.true){
        console.log('updated', 
        chalk.magenta(place.name),
        "original",
        chalk.red(currentPaymentOptions),
        "updated and returned",
        chalk.cyan(updatedPayments)
      );

    }
    

    //now add in JSON object a new option for acceptable_payments
    let acceptablePaymentAdded = Object.assign({}, place, {acceptable_payments: updatedPayments});
    updatedJson.push(acceptablePaymentAdded)
  });
//   console.log('updatedJson', updatedJson)
  return updatedJson;
}

// updatePaymentOptions(testJson);
 
//figure out how to export function
module.exports = updatePaymentOptions;