
// this is the function for rendering out the stats of the the search

function renderStats(content){
    const nbHits = content.nbHits;
    const processingTime = (content.processingTimeMS / 1000);

    $('#stats').html( ()=>{
        return ( `<div class='stats-found'> 
        <span>${nbHits} results found</span>
        <span className=''> in ${processingTime} seconds </span>
        </div>`
        )
    })
}



