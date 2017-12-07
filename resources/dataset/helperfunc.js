const chalk = require("chalk");

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
          updatedPayments.push("Discover");
        }
      }
      //if does not have Diners club or Carte Blanche it is just a copy same
      //adding in filtering to make sure only those options are used
      updatedPayments = updatedPayments.filter(card =>
        acceptablePayments.includes(card)
      );
      return updatedPayments;
    });

    //maybe if customer wanted to see the logs of what changed
    // if(log.true){
    //   console.log('updated',
    //   chalk.magenta(place.name),
    //   "original",
    //   chalk.red(currentPaymentOptions),
    //   "updated and returned",
    //   chalk.cyan(updatedPayments)
    // );
    // }

    //now add in JSON object a new option for acceptable_payments
    let acceptablePaymentAdded = Object.assign({}, place, {
      acceptable_payments: updatedPayments
    });
    updatedJson.push(acceptablePaymentAdded);
  });
  //   console.log('updatedJson', updatedJson)
  return updatedJson;
}

module.exports = updatePaymentOptions;
