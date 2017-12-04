

function singleCard(hit){
    return '<li>' + hit._highlightResult.name.value + '</li>';
    
}


aroundLatLng:ndefined
automaticRadius:"8425963"
disjunctiveFacets:[]
facets:(3) [{…}, {…}, {…}]
hierarchicalFacets:[]
hits:(20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
hitsPerPage:20
index:"restaurants"
nbHits:5000
nbPages:50
page:0
parsedQuery:undefined
processingTimeMS:2
query:""
serverUsed:undefined
timeoutCounts:undefined
timeoutHits:undefined
_rawResults:[{…}]
_state:i {inde:"restaurants", quer:"", facet:Array(3), disjunctiveFacet:Array(0), hierarchicalFacet:Array(0), …}
__proto__:Object

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