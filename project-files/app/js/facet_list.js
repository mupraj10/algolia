//function for rendering the different facets

function renderFacetList(facetType, html_tag, content) {


  $(html_tag).html(() => {
    //retrieves the facet values
    const facetValues = content.getFacetValues(facetType);
    let facetsValuesList; 

    if (facetType === 'food_type'){
        //creates the html list with the values
      facetsValuesList = $.map(facetValues, facet => {
        //actual line with the name and count
      const name = $("<td>")
          .html(facet.name)
          .attr("class", "facet-name");

        const count = $("<td>")
        .html(facet.count)
        .attr("class", "facet-count");

        //checks if the value is already selected or not
        const facetValueClass = facet.isRefined ? "active" : "";
        
        const label = $("<tr>")
          .data("facet", facet.name)
          .attr("id", "fl-" + facet.name)
          .attr('class', facetValueClass)
          .append(name)
          .append(count)

        return label;
      });
    }

    if (facetType === 'acceptable_payments'){
      //creates the html list with the values
     facetsValuesList = $.map(facetValues, facet => {
      //actual line with the name and count
    const name = $("<td>")
        .html(facet.name)
        .attr("class", "facet-payment");


      //checks if the value is already selected or not
      const facetValueClass = facet.isRefined ? "active" : "";
      
      const label = $("<tr>")
        .data("facet", facet.name)
        .attr("id", "fl-" + facet.name)
        .attr('class', facetValueClass)
        .append(name)

      return label;
    });
  }

    return facetsValuesList;
  });
}
