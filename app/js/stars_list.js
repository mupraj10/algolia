function renderStarsList(facetType, html_tag, content) {
    
    
      $(html_tag).html(() => {
        //retrieves the facet values
        const starsValues = content.getFacetValues(facetType);
        let starsList; 

                
        //find a way to sort the array from 0-5
        const sortedStars = starsValues.sort( (a, b) => {
            return parseFloat(a.name) - parseFloat(b.name)
        })

            //creates the html list with the values
          starsList = $.map(sortedStars, facet => {
    
            //adding in the stars images
            const stars = $("<img>")
              .attr('class', 'stars-count')
              .attr("src", `../../resources/graphics/${facet.name}-stars.png`);

            //checks if the value is already selected or not
            const facetValueClass = facet.isRefined ? "active" : "";
            
            const label = $("<tr>")
              .data("facet", facet.name)
              .attr("id", "fl-" + facet.name)
              .attr('class', facetValueClass)
              .append(stars)
             
            return label;
          });
        
    return starsList;
});
}