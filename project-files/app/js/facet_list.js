
//function for rendering the different facets 

function renderFoodFacetList(content, facetList, type) {
    $(`${facetList}`).html(function() {
      return $.map(content.getDisjunctiveFacetValues(`${type}`), function(facet) {
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
