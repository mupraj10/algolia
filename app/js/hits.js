function renderHits(content) {
  $("#results").html(() => {
    return $.map(content.hits, hit => {

      const image = $("<img>")
        .attr("class", "hit-image")
        .attr("src", hit.image_url);

      const name = $("<b>")
      .html(hit._highlightResult.name.value)
      .attr('class', 'hit-title');

      const starCount = hit.adjusted_stars;

      

      const stars = $("<img>")
      .attr('class', 'hit-stars')
      .attr("src", `../../resources/graphics/${starCount}-stars.png`);

      const reviews = $("<span>").html(`(${hit.reviews_count} reviews)`);

      const starsBox = $('<div>')
      .attr('class', 'hit-stars-box')
      .append(stars)
      .append(reviews);
  
      const style = $("<span>").html(
        `${hit.food_type} | ${hit.neighborhood} | ${hit.price_range}`
      ).attr('class', 'hit-style')

      const place = $("<div>")
        .attr("class", "hit")
        .append(image)
        .append(name)
        .append(starsBox)
        .append(style);

      return place;
    });
  });
}
