const jquery = require('jquery');

function RSSFeeder(){
    'use strict';

    var $ = jquery;

    var currentFeed = 0;

    this.setConfig = function(config){
        this.config = config;
    }

    this.Init = function(){

    }
    this.render = function(){
        this.fetchFeeds(this.config.feeds[currentFeed++], 10);
        setInterval(function(){
            if(currentFeed===this.config.feeds.length){
                currentFeed = 0;
            }
            this.fetchFeeds(this.config.feeds[currentFeed++], 10);
        }.bind(this), 50000);
    }

    this.fetchFeeds = function(feed, maxElements){
        $.ajax('../../data/rss/' + feed.name.replace(' ', '_') + '.xml', {
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
}

module.exports = RSSFeeder;