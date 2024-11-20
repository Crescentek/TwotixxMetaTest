const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs')

app.get('/', function(request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Home Page');
    data = data.replace(/\META_OG_TITLE/g, 'Home Page');
    data = data.replace(/\META_OG_DESCRIPTION/g, "Home page OG description");
    data = data.replace(/\OG_DESCRIPTION/g, "Home page description");
    result = data.replace(/\OGImage/g, 'https://mvp.bpmrewards.io/api/images/users/356');
    response.send(result);
  });
});

app.get('/about', function(request, response) {
  console.log('About page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'About Page');
    data = data.replace(/\META_OG_TITLE/g, 'About Page');
    data = data.replace(/\META_OG_DESCRIPTION/g, "About page OG description");
    data = data.replace(/\OG_DESCRIPTION/g, "About page description");
    result = data.replace(/\OGImage/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/contact', function(request, response) {
  console.log('Contact page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Contact Page');
    data = data.replace(/\META_OG_TITLE/g, 'Contact Page');
    data = data.replace(/\META_OG_DESCRIPTION/g, "Contact page OG description");
    data = data.replace(/\OG_DESCRIPTION/g, "About page description");
    result = data.replace(/\OGImage/g, 'https://mvp.bpmrewards.io/api/images/users/1386');
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));