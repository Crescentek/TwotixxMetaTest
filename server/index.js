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
// app.get('/', (req, res, next) => {
//     fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('Error during file reading', err);
//             return res.status(404).end()
//         }
//         else
//         {
//             console.log('File reading successful', htmlData);
//         }
//         // inject meta tags
//         htmlData = htmlData.replace(
//             "<title>OG_TITLE</title>",
//             `<title>${'TestMetaTwotixxTitle'}</title>`
//         )
//         .replace('OG_TITLE', 'TestMetaTwotixxTitleOG')
//         .replace('OG_DESCRIPTION', 'TestMetaTwotixxDescription')
//         .replace('META_OG_DESCRIPTION', 'TestMetaTwotixxDescriptionOG')
//         .replace('META_OG_IMAGE', 'https://mvp.bpmrewards.io/api/images/users/356')
//         .replace('META_OG_IMAGE_SECURED', 'https://mvp.bpmrewards.io/api/images/users/356')
//         return res.send(htmlData);
//     });
// });

// app.get('/about', (req, res, next) => {
//     fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('Error during file reading', err);
//             return res.status(404).end()
//         }
//         else
//         {
//             console.log('File reading successful', htmlData);
//         }
//         // inject meta tags
//         htmlData = htmlData.replace(
//             "<title>OG_TITLE</title>",
//             `<title>${'TestMetaTwotixxTitleAbout'}</title>`
//         )
//         .replace('OG_TITLE', 'TestMetaTwotixxTitleOGAbout')
//         .replace('OG_DESCRIPTION', 'TestMetaTwotixxDescriptionAbout')
//         .replace('META_OG_DESCRIPTION', 'TestMetaTwotixxDescriptionOGAbout')
//         .replace('META_OG_IMAGE', 'https://mvp.bpmrewards.io/api/images/users/1386')
//         .replace('META_OG_IMAGE_SECURED', 'https://mvp.bpmrewards.io/api/images/users/1386')
//         return res.send(htmlData);
//     });

    
// });

// app.get('/contact', (req, res, next) => {
//     fs.readFile(indexPath, 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('Error during file reading', err);
//             return res.status(404).end()
//         }
//         else
//         {
//             console.log('File reading successful', htmlData);
//         }
//         // inject meta tags
//         htmlData = htmlData.replace(
//             "<title>OG_TITLE</title>",
//             `<title>${'TestMetaTwotixxTitleContact'}</title>`
//         )
//         .replace('OG_TITLE', 'TestMetaTwotixxTitleOGContact')
//         .replace('OG_DESCRIPTION', 'TestMetaTwotixxDescriptionContact')
//         .replace('META_OG_DESCRIPTION', 'TestMetaTwotixxDescriptionOGContact')
//         .replace('META_OG_IMAGE', 'https://mvp.bpmrewards.io/api/images/users/1386')
//         .replace('META_OG_IMAGE_SECURED', 'https://mvp.bpmrewards.io/api/images/users/1386')
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


const express = require('express');
const path = require('path');
const fs = require("fs"); 
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '300000000d' },
));
// here we serve the index.html page
app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info

        // inject meta tags
        htmlData = htmlData.replace(
            "<title>Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.</title>",
            `<title>${'Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing..'}</title>`
        )
        .replace('META_OG_TITLE', 'Home OG Title')
        .replace('META_OG_DESCRIPTION', 'Home OG Description')
        .replace('OG_DESCRIPTION', 'Home Description')
        .replace('%PUBLIC_URL%/OGImage.jpg', 'https://mvp.bpmrewards.io/api/images/users/356')

        console.log('Meta File reading successful', htmlData);

        return res.send(htmlData);
    });
});
// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});