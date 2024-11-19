const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const indexPath = path.resolve(__dirname, "../build/index.html");

// Serve static files from the build folder
app.use(express.static(path.resolve(__dirname, "../build"), { maxAge: "1d" }));

// Serve the root page with meta tag injection
app.get("/", (req, res) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error reading index file", err);
      return res.status(500).send("Internal Server Error");
    }
    // Inject custom meta tags
    htmlData = htmlData
      .replace(
        "<title>Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.</title>",
        `<title>${"Home Title..."}</title>`
      )
      .replace("META_OG_TITLE", "Home OG Title")
      .replace("META_OG_DESCRIPTION", "Home OG Description")
      .replace(
        "%PUBLIC_URL%/OGImage.jpg",
        "https://mvp.bpmrewards.io/api/images/users/356"
      );

    return res.send(htmlData);
  });
});

// About page
app.get("/about", (req, res) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error reading index file", err);
      return res.status(500).send("Internal Server Error");
    }
    htmlData = htmlData
      .replace(
        "<title>Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.</title>",
        `<title>${"About Page Title"}</title>`
      )
      .replace("META_OG_TITLE", "About OG Title")
      .replace("META_OG_DESCRIPTION", "About OG Description")
      .replace(
        "%PUBLIC_URL%/OGImage.jpg",
        "https://mvp.bpmrewards.io/api/images/users/1386"
      );

    return res.send(htmlData);
  });
});

// Contact page
app.get("/contact", (req, res) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error reading index file", err);
      return res.status(500).send("Internal Server Error");
    }
    htmlData = htmlData
      .replace(
        "<title>Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.</title>",
        `<title>${"Contact Page Title"}</title>`
      )
      .replace("META_OG_TITLE", "Contact OG Title")
      .replace("META_OG_DESCRIPTION", "Contact OG Description")
      .replace(
        "%PUBLIC_URL%/OGImage.jpg",
        "https://mvp.bpmrewards.io/api/images/users/1386"
      );

    return res.send(htmlData);
  });
});

// Export as Vercel middleware
module.exports = app;



// const express = require('express');
// const path = require('path');
// const fs = require("fs"); 
// const app = express();

// const PORT = process.env.PORT || 3000;
// const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

// // static resources should just be served as they are
// app.use(express.static(
//     path.resolve(__dirname, '..', 'build'),
//     { maxAge: '300000000d' },
// ));
// // here we serve the index.html page
// app.get('/*', (req, res, next) => {
//     fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('Error during file reading', err);
//             return res.status(404).end()
//         }
//         // get post info

//         // inject meta tags
//         htmlData = htmlData.replace(
//             "<title>Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.</title>",
//             `<title>${'Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing..'}</title>`
//         )
//         .replace('META_OG_TITLE', 'Home OG Title')
//         .replace('META_OG_DESCRIPTION', 'Home OG Description')
//         .replace('OG_DESCRIPTION', 'Home Description')
//         .replace('%PUBLIC_URL%/OGImage.jpg', 'https://mvp.bpmrewards.io/api/images/users/356')

//         console.log('Meta File reading successful', htmlData);

//         return res.send(htmlData);
//     });
// });
// // listening...
// app.listen(PORT, (error) => {
//     if (error) {
//         return console.log('Error during app startup', error);
//     }
//     console.log("listening on " + PORT + "...");
// });