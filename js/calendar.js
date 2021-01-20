const cal_data = require('../data/calendars/calendars.json')
const icalToolkit = require('ical-toolkit');
const jquery = require('jquery');
const moment = require('moment');

function Calendar(){
    'use strict';
    var $ = jquery;

    this.setConfig = function(config){
        this.config = config;
    }

    this.Init = function(){

    }
    this.renderSideBar = function(){
        let dateString = moment(new Date()).format("dddd DD MMMM");
        let template = `<h1>${dateString}</h1>
        <h3 class="primary-color">4 Items</h3>
        <ul class="calendar-events">
            <li>
                <p><strong>8:00 AM</strong><br/>
                Team Meeting</p>
            </li>
            <li>
                <p><strong>10:00 AM</strong><br/>
                Call Jane</p>
            </li>
            <li>
                <p><strong>12:00 PM</strong><br/>
                Lunch with John</p>
            </li>
            <li>
                <p><strong>7:00 PM</strong><br/>
                Dinner with Jane</p>
            </li>
        </ul>`;

        $('.ml-calendar .sidebar').html(template);
    }

    this.render = function(){
        var year = new Date().getFullYear();
        cal_data.calendars.forEach(element => {
            $.ajax({
                url: `/data/calendars/${element.file}`,
                context: this,
                success: function(data){
                    var context = this;
                    var output = icalToolkit.parseToJSON(data, function(err, json){
                        json.VEVENT.filter(function(element){
                            return (((element['DTEND;VALUE=DATE']) && (element['DTEND;VALUE=DATE'].subString(0,3)===year))
                                    || ((element['DTEND']) && (element['DTEND'].subString(0,4)===year))) 
                                    && (!element['RRULE'])
                        });
                        var output = json;
                        context.renderSideBar();
                    });
                }
            });
        });
    }
}

module.exports = Calendar;