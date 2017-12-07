function renderHits(content) {
  //adding in a loader for when 
  $('#loading').hide();

  $("#results").html(() => {
    return $.map(content.hits, hit => {

      const image = $("<img>")
        .attr("class", "hit-image")
        .attr("src", hit.image_url);

      const name = $("<h4>")
      .html(hit._highlightResult.name.value)
      .attr('class', 'hit-title');

      const starCount = hit.adjusted_stars;

      const stars = $("<img>")
      .attr('class', 'hit-stars')
      .attr("src", `resources/graphics/${starCount}-stars.png`);

      const reviews = $("<span>").html(`(${hit.reviews_count} reviews)`);

      const style = $("<p>").html(
        `${hit.food_type} | ${hit.neighborhood} | ${hit.price_range}`
      ).attr('class', 'hit-style')

      const starsBox = $('<p>')
      .html(hit.stars_count)
      .attr('class', 'hit-stars-box')
      .append(stars)
      .append(reviews);


      const infoBox = $('<div>')
      .attr('class', 'hit-info-box')
      .append(name)
      .append(starsBox)
      .append(style);

  
     
      const place = $("<div>")
        .attr("class", "hit")
        .append(image)
        .append(infoBox)
  

      return place;
    });
  });
}
