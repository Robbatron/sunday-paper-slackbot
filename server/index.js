const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const { URL } = require('url');
const firebase = require('firebase');
const http = require('http');
const bodyParser = require("body-parser");

const app = express();

// priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {

  // text after slash command - hopefully it's a url
  const url = req.body.text;

  // message to send back to slack channel - format later
  const data = {
    response_type: 'in_channel', // public to the channel - make ethereal
    text: 'thanks for the scoop! '
  };

  // slack needs a response within 2000ms
  res.send(data);

  request(url, function (err, res, html) {

    if (!err) {

      const
        $ = cheerio.load(html),
        title = $('title').text().replace(/\s+/g, " ").split(/(?=\s)/gi).slice(0, 5).join(''),
        today = new Date(),
        date = `${(today.getMonth() + 1)}-${today.getDate()}-${today.getFullYear()}`;

      // description
      const
        normalDesc = $('meta[name="description"]') && $('meta[name="description"]')[0] && $('meta[name="description"]')[0].attribs.content,
        ogPossibleDesc = $('meta[property="og:description"]') && $('meta[property="og:description"]')[0] && $('meta[property="og:description"]')[0].attribs.content,
        twitterPossibleDesc = $('meta[name="twitter:description"]') && $('meta[name="twitter:description"]')[0] && $('meta[name="twitter:description"]')[0].attribs.content,
        desc = normalDesc || ogPossibleDesc || twitterPossibleDesc || '';

      // image
      const
        ogImg = $('meta[property="og:image"]') && $('meta[property="og:image"]')[0] && $('meta[property="og:image"]')[0].attribs.content,
        twitterImg = $('meta[name="twitter:image"]') && $('meta[name="twitter:image"]')[0] && $('meta[name="twitter:image"]')[0].attribs.content,
        image = ogImg || twitterImg || 'http://lorempixel.com/400/200/abstract';

      // author - just use username of submitter
      const author = req.body.user_name;

      // initialize Firebase
      const config = {
        apiKey: "AIzaSyAGoW6bQZPIHhl3F1BJ193L18zCJIB3YL4",
        authDomain: "sundaypaper-935e0.firebaseapp.com",
        databaseURL: "https://sundaypaper-935e0.firebaseio.com",
        projectId: "sundaypaper-935e0",
        storageBucket: "sundaypaper-935e0.appspot.com",
        messagingSenderId: "365673062936"
      };

      // only initialize if there is not an existing firebase instance
      firebase.apps.length === 0 && firebase.initializeApp(config);

      // push object of scraped information to firebase
      firebase.database().ref('/articles').push({ url, author, title, desc, image, date });

    } else throw err;
  });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// listen on server port or 5000
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});