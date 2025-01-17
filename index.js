import * as cheerio from 'cheerio';
import fs from 'fs';
import https, { request } from 'https';
import path from 'path';

//Fetch the HTML data from website and assign to response
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const html = await response.text();

// Use cheerio to parse the HTML data
const $ = cheerio.load(html);

// Get all links in <section id="images">

const allLinks = $('#images')
  .find('div > a > img')
  .toArray()
  .map((element) => $(element).attr('src'));

// Get only first 10 links
const firstTenLinks = allLinks.slice(0, 10);

// Remove "?width=300"
const firstTenLinksClean = firstTenLinks.map((element) =>
  element.slice(0, -10),
);

//Function to download images
const downloadMeme = (url, destPath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const filePath = fs.createWriteStream(destPath);
      res.pipe(filePath);
      resolve(true);
    });
  });
};

//Use links in firstTenLinksClean array to save to /memes
const createDownloadRequests = (firstTenLinksClean) => {
  const requests = [];
  firstTenLinksClean.forEach((url, index) => {
    const filename = `${String(index + 1).padStart(2, '0')}.jpg`;
    const destPath = `./memes/${filename}`;
    requests.push(downloadMeme(url, destPath));
  });
  return requests;
};
// download images
(async () => {
  try {
    const requests = createDownloadRequests(firstTenLinksClean);
    await Promise.all(requests);
  } catch (err) {
    console.log(err);
  }
})();
