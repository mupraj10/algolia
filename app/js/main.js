//algolia

const applicationID = "BYAMNN0H16";
const apiKey = "75a10d692eba6953c2c798c1c63df046";

const indexName = "restaurants";
const options = {
  //options to sort from
  facets: ["adjusted_stars", "acceptable_payments"],
  //since we want the search people to search different food types
  disjunctiveFacets: ["food_type"],
  //restrict each search to show 3 options at the beginning
  hitsPerPage: 3,
  // restrict the number of facets shown
  maxValuesPerFacet: 6
  //can add in location by IP as backup
  // aroundLatLngViaIP: true
};

const client = algoliasearch(applicationID, apiKey);
const helper = algoliasearchHelper(client, indexName, options);

//start by getting results of location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(applyLocation, defaultLocation);
}

// success handler if customer allows location search
function applyLocation(position) {
  const location = `${position.coords.latitude}, ${position.coords.longitude}`;

  console.log("Searching at these coordinates:", location);
  helper.setQueryParameter("aroundLatLng", location).search();
}

// error handler but if customer declines the search is set to NYC
function defaultLocation() {
  console.log("Defaulting location to NYC");
  const nycCoords = "40.7128, 74.0060";
  helper.setQueryParameter("aroundLatLng", nycCoords).search();
}

//  input search as you type
$("#search-box").on("keyup", function() {
  helper.setQuery($(this).val()).search();
});

//list of facets and the html ids for iterating.
const facetsList = [
  { name: "food_type", html_tag: "#food-list" }, //disjunctive
  { name: "acceptable_payments", html_tag: "#cc-list" }, // facet
  { name: "adjusted_stars", html_tag: "#stars-list" } //facet
];

//combine the helper.on function for all calls
helper.on("result", content => {
  facetsList.forEach(facet =>
    renderFacetList(facet.name, facet.html_tag, content)
  );
  renderStarsList('adjusted_stars', '#stars-list', content)
  renderHits(content);
  renderStats(content);
});


 // making the facet list responsivs
facetsList.forEach(facet => {
  $(facet.html_tag).on("click", "tr", function (evt){
    const facetValue = $(this).data("facet");
    helper.toggleFacetRefinement(facet.name, facetValue);
    helper.search();
  });
});

//tried to implement a back button
// const goBackButton = $('<button>').html('Go Back!').attr('id', 'go-back').attr('class', 'go-back');

//renders next 3 options and adds button
$('#show-more').on('click', () =>{
  helper.nextPage().search();
  // $('.buttons').append(goBackButton);
});



helper.search();

