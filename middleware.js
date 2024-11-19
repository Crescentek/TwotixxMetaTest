export const config = {
    // List all the static routes where middleware will be applied
    matcher: ['/about', '/contact'], 
  };
  
  export default async function middleware(req) {
    // Extract the User-Agent header to identify social media crawlers
    const userAgent = req.headers.get('user-agent');
  
    // Define regex for detecting social media crawlers
    const socialMediaCrawlerUserAgents = /Twitterbot|facebookexternalhit|Facebot|LinkedInBot|Pinterest|Slackbot|vkShare|W3C_Validator/i;
    const isSocialMediaCrawler = socialMediaCrawlerUserAgents.test(userAgent);
  
    // Return the actual page if it's a user request
    if (!isSocialMediaCrawler) {
      return;
    }
  
    // Customize meta tags dynamically based on the route
    let title = 'Default Title';
    let description = 'Default Description';
    let seoImage = 'https://mvp.bpmrewards.io/api/images/users/1386';
  
    if (req.nextUrl.pathname === '/about') {
      title = 'About Us';
      description = 'Learn more about our company and team.';
      seoImage = 'https://picsum.photos/seed/picsum/200/300';
    } else if (req.nextUrl.pathname === '/contact') {
      title = 'Contact Us';
      description = 'Get in touch with us through our contact page.';
      seoImage = 'https://mvp.bpmrewards.io/api/images/users/356';
    }
  
    // Return a custom HTML response for social crawlers
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="title" content="${title}" />
        <meta name="description" content="${description}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${seoImage}" />
        <meta property="og:url" content="${req.url}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="${seoImage}" />
      </head>
      <body>
        <h1>${title}</h1>
        <p>${description}</p>
        <img src="${seoImage}" alt="SEO Image" />
      </body>
      </html>
      `,
      {
        headers: { 'content-type': 'text/html' },
      }
    );
  }
  