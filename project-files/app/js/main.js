//algolia 
 

const applicationID = 'BYAMNN0H16'
const apiKey = '75a10d692eba6953c2c798c1c63df046'

const indexName = 'restaurants'
const options = {
//options to sort from
facets:['stars_count', 'acceptable_payments'],
//since we want the search to be food_type specific
disjunctiveFacets: ['food_type'],
//restrict the number of facets shown
maxValuesPerFacet: 7,
//can add in location by IP as backup 
    // aroundLatLngViaIP: true
}


const client = algoliasearch(applicationID, apiKey);
const helper = algoliasearchHelper(client, indexName, options);

//start by getting results of location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( applyLocation, defaultLocation);
}

// success handler if customer allows location search
function applyLocation(position) {
    const location = `${position.coords.latitude}, ${
      position.coords.longitude}`;

    console.log('Searching at these coordinates:', location);
    helper.setQueryParameter("aroundLatLng", location).search();
  }

  // error handler but if customer declines the search is set to NYC
  function defaultLocation() {
    console.log("Defaulting location to NYC");
    const nycCoords = "40.7128, 74.0060";
    helper.setQueryParameter("aroundLatLng", nycCoords).search();
  }

//  input search as you type
  $('#search-box').on('keyup', function() {
    helper.setQuery($(this).val())
          .search();
  });

 
  //combine the helper.on function for all calls 
  helper.on("result", content => {
      console.log(content); 
    renderFoodFacetList(content, '#food-list', 'food_type');
    renderFacetList(content, '#payment-list', 'acceptable_payment');
    renderHits(content);
    renderStats(content);
});


function renderHits(content) {
    $('#container').html(function() {
      return $.map(content.hits, function(hit) {
        return (
            `<article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
            <div class="dtc w2 w3-ns v-mid">
              <img src="${hit.image_url}" class="ba br3 b--black-10 db br2 w2 w3-ns h2 h3-ns"/>
            </div>
            <div class="dtc v-mid pl3">
              <h1 class="f6 f5-ns fw6 lh-title black mv0"> ${hit._highlightResult.name.value} </h1>
              <span> ${hit.stars_count} <img src='../../resources/graphics/stars-plain.png' Stars go here <span class="f6 fw4 mt0 mb0 black-60">(${hit.reviews_count} reviews ) </span></span> <br/>
              <span class="f6 fw4 mt0 mb0 black-60"> ${hit.food_type} | ${hit.neighborhood} | ${hit.price_range}</span>
            </div>` )
      });
    });
  }

  
$('#facet-list').on('click', 'input[type=checkbox]', function(e) {
  var facetValue = $(this).data('facet');  
  helper.toggleRefinement('food_type', facetValue)
        .search();
});

function renderFacetList(content) {
  $('#facet-list').html(function() {
    return $.map(content.getFacetValues('food_type'), function(facet) {
      var checkbox = $('<input type=checkbox>')
        .data('facet', facet.name)
        .attr('id', 'fl-' + facet.name);
      if (facet.isRefined) checkbox.attr('checked', 'checked');
      var label = $('<label>').html(facet.name + ' (' + facet.count + ')')
                              .attr('for', 'fl-' + facet.name);
      return $('<li>').append(checkbox).append(label);
    });
  });
}


helper.search();