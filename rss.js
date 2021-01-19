const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

const file = fs.createWriteStream("./data/rss/nieuwsblad.xml");
const request = http.get("http://feeds.nieuwsblad.be/nieuws/snelnieuws", function(response) {
  response.pipe(file);
});