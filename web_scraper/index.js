const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the website you want to scrape
  await page.goto('https://sud0x00.github.io/my-portfolio/#/about');

  // Get all the images, audio, video, and text on the page
  const images = await page.$$eval('img', imgs => imgs.map(img => img.src));
  const audio = await page.$$eval('audio', audios => audios.map(audio => audio.src));
  const video = await page.$$eval('video', videos => videos.map(video => video.src));
  const text = await page.$$eval('*', elements => elements.map(element => element.textContent));

  const nonEmptyText = text.filter(content => content !== "");


  // Classify each item as either an image, audio, video, or text
  const classifiedImages = images.filter(src => src.endsWith('.jpg') || src.endsWith('.png')).map(src => ({ type: 'image', src }));
  const classifiedAudio = audio.filter(src => src.endsWith('.mp3') || src.endsWith('.wav')).map(src => ({ type: 'audio', src }));
  const classifiedVideo = video.filter(src => src.endsWith('.mp4') || src.endsWith('.webm')).map(src => ({ type: 'video', src }));
  const classifiedText = text.map(content => ({ type: 'text', content }));

  const allContent = [...classifiedImages, ...classifiedAudio, ...classifiedVideo, ...classifiedText];


  fs.writeFile('content.json', JSON.stringify(allContent), err => {
    if (err) throw err;
    console.log('Content written to file!');
  });

  await browser.close();

})();