
// this is the function for rendering out the stats of the the search

function renderStats(content){
    const nbHits = content.nbHits;
    const processingTime = (content.processingTimeMS / 1000);

    $('#stats').html( () => {
        const numHits = $('<b>')
                        .html(`${nbHits} results found`)
                        .attr('class', 'stats-found');

        const seconds = $('<span>')
                        .html(` in ${processingTime} seconds`)
                        .attr('class', 'stats-seconds');

        const stats = $('<div>')
                      .attr('class', 'stats-box')
                      .append(numHits)
                      .append(seconds)
        return stats;
    })
}

