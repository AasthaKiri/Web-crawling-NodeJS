const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');
// const https = require('https');
// const fs = require('fs');
// const { url } = require('inspector');
// const { createWorker } = require('tesseract.js');
// const { createWorker: createOcrWorker } = require('node-tesseract-ocr');

async function getCaptchaValue() {

  try {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://directory6.org/submit?c=2&LINK_TYPE=1');

  await page.waitForSelector('img.captcha');


  //title
  await page.evaluate((selector, value) => {
    const titleName = document.querySelector(selector);
    titleName.value = value;
  }, 'input[name="TITLE"]', "IPL Finals");

  // Get the value of the input field
  const titleValue = await page.evaluate(selector => {
    const titleName = document.querySelector(selector);
    return titleName.value;
  }, 'input[name="TITLE"]');


  // //url
  await page.evaluate((selector,value) =>{
    const urlName = document.querySelector(selector);
    urlName.value = value;
  },'input[name="URL"]','https://iplfinals.com/')

  const urlValue = await page.evaluate(selector =>{
    const urlName = document.querySelector(selector);
    return urlName.value
  },'input[name="URL"]')


  //captcha
  const captchaElement = await page.$('img.captcha');
  const captchaScreenshot = await captchaElement.screenshot();

  // Use tesseract.js to extract text from the captcha image
  const { data: { text } } = await Tesseract.recognize(captchaScreenshot);

  // Clean up the text
  const captchaValue = text.trim().replace(/[^A-Za-z0-9]/g, '');

  await page.evaluate((selector,value) =>{
    const captchaName = document.querySelector(selector);
    captchaName.value = value;
  },'input[name="CAPTCHA"]',captchaValue)

  const catValue = await page.evaluate(selector => {
    const catName = document.querySelector(selector);
    return catName.value;
  }, 'input[name="CAPTCHA"]');


//checkbox
await page.evaluate((selector, value) => {
  const checkbox = document.querySelector(selector);
  checkbox.checked = value;
}, 'input[name="AGREERULES"]', true);

const cbValue = await page.evaluate(selector => {
  const cbName = document.querySelector(selector);
  return cbName.checked;
}, 'input[name="AGREERULES"]');


if (captchaValue.length===5){
  console.log(titleValue);
  console.log(urlValue);
  console.log(catValue);
  console.log(cbValue);

  await page.waitForSelector('input[name="continue"]'); // Wait for the submit button to be present
  await page.click('input[name="continue"]');
  
  await page.waitForNavigation({ timeout: 60000 });

}
else{
  console.log("Try Again");
}


await page.waitForSelector('div.phpld-column.phpld-messages');

const postElement = await page.$$eval('div.phpld-column.phpld-messages > p', nodes => nodes.map(node => node.textContent));
console.log(postElement);

await browser.close();

 
  }
catch (error) {
  console.log(error);
    }
}

getCaptchaValue();
