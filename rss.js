const config = require('./data/config.json');
const http = require('http'); // or 'https' for https:// URLs
const https = require('https');
const fs = require('fs');
const calendars = require('./data/calendars/calendars.json');

config.rss.feeds.forEach(element => {
    let properName = element.name.replace(' ', '_');
    const file = fs.createWriteStream(`./data/rss/${properName}.xml`);
    const request = http.get(element.url, function(response) {
    response.pipe(file);
  });
});

config.calendar.endpoints.forEach(element => {
  const request = https.get(element, function(response) {
    var data = "";

    response.on("data", function(chunk) {
      data += chunk;
    });

    response.on("end", function(chunk) {
      var nameRegx = new RegExp('(.*)(X-WR-CALNAME\:)(.*?)(\\r)', 'g')
      var matches = nameRegx.exec(data);
      if(matches.length<5){
        return;
      }
      let name = matches[3].toLowerCase().replace(' ', '_');
      let calmatches = calendars.calendars.filter(function(element){
        return element.name === name;
      });
      if(calmatches.length===0){
        calendars.calendars.push({"name": name, "lastupdated": new Date(), "file": `${name}.ical`});
      }else if(calmatches.length===1){
        calmatches[0].name = name;
        calmatches[0].lastupdated = new Date();
        calmatches[0].file = `${name}.ical`;
      }

      fs.writeFile("./data/calendars/calendars.json", JSON.stringify(calendars, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
      });

      //X-WR-CALNAME:Rodstreet 101
      const file = fs.createWriteStream(`./data/calendars/${name}.ical`);
      file.write(data);
      file.close();
    });
  });
});