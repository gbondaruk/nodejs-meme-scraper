// Fetches html of any link and prints it out to the console
fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((res) => res.text())
  .then((text) => console.log(text));
