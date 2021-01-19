var feeds = [
    '../../data/rss/nieuwsblad.xml'
];
var currentFeed = 0;

jQuery(function(){
    function fetchFeeds(url, maxElements){
        $.ajax(url, {
            accepts: {
            xml: "application/rss+xml"
            },
        
            dataType: "xml",
        
            success: function(data) {
                let xml = $(data);
                let items = xml.find("item");
                let itemCount = (maxElements<items.length?maxElements:items.length);
                $('#ticker').html('');
                for (let i = 0; i < itemCount; i++) {
                    const element = items[Math.floor(Math.random() * itemCount)];
                    const template = `<div class="ticker__item">${$(element).find("title").text()}</div>`;
            
                    $('#ticker').append(template);
                }
            }
        });
    }
    fetchFeeds(feeds[currentFeed++], 10);
    setInterval(function(){
        if(currentFeed===feeds.length){
            currentFeed = 0;
        }
        fetchFeeds(feeds[currentFeed++], 10);
    }, 50000)
})
//'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'