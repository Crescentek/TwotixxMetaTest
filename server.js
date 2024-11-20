const express = require('express');
const axios = require('axios');
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
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.');
    data = data.replace(/\META_OG_TITLE/g, 'Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.');
    data = data.replace(/\META_OG_DESCRIPTION/g, "Discover a world of events with Twotixx! Enjoy seamless ticket purchases with our innovative digital, NFT, and personalised ticket options. Experience secure, transparent ticketing with low fees today.");
    data = data.replace(/\OG_DESCRIPTION/g, "Discover a world of events with Twotixx! Enjoy seamless ticket purchases with our innovative digital, NFT, and personalised ticket options. Experience secure, transparent ticketing with low fees today.");
    result = data.replace(/\OGImage/g, "%PUBLIC_URL%/OGImage.jpg");
    response.send(result);
  });
});

app.get('/organisers', function(request, response) {
  console.log('Organisers page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Event Organisers Hub | Twotixx Ticketing Solutions');
    data = data.replace(/\META_OG_TITLE/g, 'Event Organisers Hub | Twotixx Ticketing Solutions');
    data = data.replace(/\META_OG_DESCRIPTION/g, `Empower your event with Twotixx’s advanced ticketing solutions. Learn how personalised and NFT tickets can elevate attendee experience and streamline your event management process. Join us now!`);
    data = data.replace(/\OG_DESCRIPTION/g, `Empower your event with Twotixx’s advanced ticketing solutions. Learn how personalised and NFT tickets can elevate attendee experience and streamline your event management process. Join us now!`);
    result = data.replace(/\OGImage/g, "%PUBLIC_URL%/OGImage.jpg");
    response.send(result);
  });
});

app.get('/event-list', function(request, response) {
  console.log('event-list page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Explore and Buy Event Tickets | Twotixx Events Marketplace');
    data = data.replace(/\META_OG_TITLE/g, 'Explore and Buy Event Tickets | Twotixx Events Marketplace');
    data = data.replace(/\META_OG_DESCRIPTION/g, `Browse through a diverse list of events on Twotixx and secure your spot instantly! From concerts to conferences, buy your tickets easily and enjoy our low, transparent fees.`);
    data = data.replace(/\OG_DESCRIPTION/g, `Browse through a diverse list of events on Twotixx and secure your spot instantly! From concerts to conferences, buy your tickets easily and enjoy our low, transparent fees.`);
    result = data.replace(/\OGImage/g, "%PUBLIC_URL%/OGImage.jpg");
    response.send(result);
  });
});

app.get('/ticketGuard', function(request, response) {
  console.log('ticketGuard page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'TicketGuard by Twotixx: Secure, Personalized Ticket Verification');
    data = data.replace(/\META_OG_TITLE/g, 'TicketGuard by Twotixx: Secure, Personalized Ticket Verification');
    data = data.replace(/\META_OG_DESCRIPTION/g, `Experience the future of ticket security with TicketGuard by Twotixx. Our unique ID verification ensures your event entry is protected. Trust TicketGuard for a safe event-going experience.`);
    data = data.replace(/\OG_DESCRIPTION/g, `Experience the future of ticket security with TicketGuard by Twotixx. Our unique ID verification ensures your event entry is protected. Trust TicketGuard for a safe event-going experience.`);
    result = data.replace(/\OGImage/g, "%PUBLIC_URL%/OGImage.jpg");
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
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'About Twotixx | Innovative Ticketing Platform for your event');
    data = data.replace(/\META_OG_TITLE/g, 'About Twotixx | Innovative Ticketing Platform for your event');
    data = data.replace(/\META_OG_DESCRIPTION/g, "Get to know Twotixx, the leader in smart, digital ticketing solutions. Our platform offers NFT, personalised tickets, and low fees to transform how you attend events. Learn more about our vision and services.");
    data = data.replace(/\OG_DESCRIPTION/g, "Get to know Twotixx, the leader in smart, digital ticketing solutions. Our platform offers NFT, personalised tickets, and low fees to transform how you attend events. Learn more about our vision and services.");
    result = data.replace(/\OGImage/g, 'https://i.imgur.com/V7irMl8.png');
    response.send(result);
  });
});

app.get('/app', function(request, response) {
  console.log('app page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Twotixx Apps | Download Our Ticket Wallet & Venue App');
    data = data.replace(/\META_OG_TITLE/g, 'Twotixx Apps | Download Our Ticket Wallet & Venue App');
    data = data.replace(/\META_OG_DESCRIPTION/g, `Access your tickets easily with the Twotixx Ticket Wallet App and manage event admissions smoothly with our Venue App. Download now for a streamlined ticketing experience on the go!`);
    data = data.replace(/\OG_DESCRIPTION/g, `Access your tickets easily with the Twotixx Ticket Wallet App and manage event admissions smoothly with our Venue App. Download now for a streamlined ticketing experience on the go!`);
    result = data.replace(/\OGImage/g, "%PUBLIC_URL%/OGImage.jpg");
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
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Contact Twotixx Support | Get Help and Information');
    data = data.replace(/\META_OG_TITLE/g, 'Contact Twotixx Support | Get Help and Information');
    data = data.replace(/\META_OG_DESCRIPTION/g, `Need assistance or have questions? Contact Twotixx for support and information. Our team is here to help you with all your ticketing needs. Reach out today!`);
    data = data.replace(/\OG_DESCRIPTION/g, `Need assistance or have questions? Contact Twotixx for support and information. Our team is here to help you with all your ticketing needs. Reach out today!`);
    result = data.replace(/\OGImage/g, 'https://mvp.bpmrewards.io/api/images/users/1386');
    response.send(result);
  });
});

app.get('/app', function(request, response) {
  console.log('app page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Twotixx Apps | Download Our Ticket Wallet & Venue App');
    data = data.replace(/\META_OG_TITLE/g, 'Twotixx Apps | Download Our Ticket Wallet & Venue App');
    data = data.replace(/\META_OG_DESCRIPTION/g, `Access your tickets easily with the Twotixx Ticket Wallet App and manage event admissions smoothly with our Venue App. Download now for a streamlined ticketing experience on the go!`);
    data = data.replace(/\OG_DESCRIPTION/g, `Access your tickets easily with the Twotixx Ticket Wallet App and manage event admissions smoothly with our Venue App. Download now for a streamlined ticketing experience on the go!`);
    result = data.replace(/\OGImage/g, "%PUBLIC_URL%/OGImage.jpg");
    response.send(result);
  });
});

app.get('/grants', function(request, response) {
  console.log('grants page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', 'Event Organiser Grants by Twotixx | Funding Your Next Event');
    data = data.replace(/\META_OG_TITLE/g, 'Event Organiser Grants by Twotixx | Funding Your Next Event');
    data = data.replace(/\META_OG_DESCRIPTION/g, `Unlock new opportunities for your events with financial grants from Twotixx. Learn how our support can help bring your event ideas to life and make them a reality. Apply now and grow with us.`);
    data = data.replace(/\OG_DESCRIPTION/g, `Unlock new opportunities for your events with financial grants from Twotixx. Learn how our support can help bring your event ideas to life and make them a reality. Apply now and grow with us.`);
    result = data.replace(/\OGImage/g, "%PUBLIC_URL%/OGImage.jpg");
    response.send(result);
  });
});

function stripHtmlTags(html) {
  // Create a temporary DOM element
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || '';
}

app.get('/event-details/:slug', async  function(request, response) {
  console.log('event-details page visited!');
  const eventId = request.params.slug.split("-").pop();
  console.log("eventId", eventId);

  try {
    // const apiResponse = await axios.get(`${process.env.REACT_APP_API_URL}getevents/${eventId}`);
                                
    console.log('API response:',`https://mvp.bpmrewards.io/getevents/${eventId}`);
    const apiResponse = {data: [{name: "Event Page123", description: "Event Description123", imageUri: "/api/images/users/1386"}]};
    // const apiResponse = await axios.get(`https://mvp.bpmrewards.io/getevents/${eventId}`);
  
    console.log('API response:',`https://mvp.bpmrewards.io/getevents/${eventId}`, apiResponse?.data);

    // Read and modify the HTML file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err);
        return response.status(500).send('An error occurred.');
      }

      const filePath = path.resolve(__dirname, './build', 'index.html')
      fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        data = data.replace('Twotixx | Your Gateway to Exciting Events with Smart Digital Ticketing.', apiResponse?.data[0]?.name || 'Event Page');
        data = data.replace(/\META_OG_TITLE/g, apiResponse?.data[0]?.name || 'Event Page');
        data = data.replace(/\META_OG_DESCRIPTION/g, stripHtmlTags(apiResponse?.data[0]?.description) || 'Event Description');
        data = data.replace(/\OG_DESCRIPTION/g, stripHtmlTags(apiResponse?.data[0]?.description) || 'Event Description');
        result = data.replace(/\OGImage/g, `https://mvp.bpmrewards.io${apiResponse?.data[0]?.imageUri}`);
        response.send(result);
      });

    });
  } catch (error) {
    console.error('Error fetching event data:', error);
    response.status(500).send('Failed to fetch event details.');
  }
});



app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));