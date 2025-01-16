import * as cheerio from 'cheerio';

// Fetch the HTML data from website and assign to response
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
const firstTenLinksWithoutWidth = firstTenLinks.map((element) =>
  element.slice(0, -10),
);

console.log(firstTenLinksWithoutWidth);
