function renderHits(content) {
  $("#results").html(() => {
    return $.map(content.hits, hit => {

      const image = $("<img>")
        .attr("class", "hit-image")
        .attr("src", hit.image_url);

      const name = $("<h4>")
      .html(hit._highlightResult.name.value)
      .attr('class', 'hit-title');

      const stars = $("<img>")
      .attr('class', 'stars-count')
      .attr("src", "../../resources/graphics/stars-plain.png");

      const reviews = $("<span>").html(`(${hit.reviews_count} reviews)`);

      const style = $("<div>").html(
        `${hit.food_type} | ${hit.neighborhood} | ${hit.price_range}`
      );

      const place = $("<div>")
        .attr("class", "hit")
        .append(image)
        .append(name)
        .append(stars)
        .append(reviews)
        .append(style);

      return place;
    });
  });
}
