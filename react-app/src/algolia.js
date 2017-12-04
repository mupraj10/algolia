//algolia 

const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');

const applicationID = 'BYAMNN0H16'
const apiKey = '75a10d692eba6953c2c798c1c63df046'

const indexName = 'restaurants'
const facets = {facets:['food_type', 'stars_count', 'acceptable_payments']}

export const client = algoliasearch(applicationID, apiKey);
export const helper = algoliasearchHelper(client, indexName, facets);

