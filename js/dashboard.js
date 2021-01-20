const Weather = require('./weather');
const Calendar = require('./calendar');
const Rss = require('./rss');
const Config = require('../data/config.json');
const Translations = require('./translations');
const RSSFeeder = require('./rss');

function kitchenDashboard(){
    'use strict';

    this.Init = function(){
        this.queryParams = this.getUrlVars();
        this.weather = new Weather();
        this.weather.setConfig(Config.weather);
        this.weather.setTranslations(Translations[Config.general.locale]);
        this.weather.setLocale(Config.general.locale);

        this.rss = new RSSFeeder();
        this.rss.setConfig(Config.rss);

        this.calendar = new Calendar();
        this.calendar.setConfig(Config.calendar);
        
    }

    this.render = function(){
        console.log("rendering");
        this.weather.render(this.queryParams.weatherapi_key);
        this.rss.render();
        this.calendar.render();
    }

    this.getUrlVars = function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
}

module.exports = kitchenDashboard;