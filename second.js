const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');

async function getCaptchaValue() {

  try {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.directory-free.com/submit/add.php');

  //title
  await page.evaluate((selector, value) => {
    const titleName = document.querySelector(selector);
    titleName.value = value;
  }, 'input[name="linkname"]', "Javapoint");

  // Get the value of the input field
  const titleValue = await page.evaluate(selector => {
    const titleName = document.querySelector(selector);
    return titleName.value;
  }, 'input[name="linkname"]');

  //url
  await page.evaluate((selector,value) =>{
    const urlName = document.querySelector(selector);
    urlName.value = value;
  },'input[name=linkurl]','https://www.javapoint.com/')

  const urlValue = await page.evaluate(selector =>{
    const urlName = document.querySelector(selector);
    return urlName.value
  },'input[name=linkurl]')

//description
  await page.evaluate((selector,value) =>{
    const descName = document.querySelector(selector);
    descName.value = value;
  },'textarea[name=descriere]','Our JavaScript Tutorial  designed for beginners and professionals both. JavaScript is used to create client-side dynamic pages.')

  const descValue = await page.evaluate(selector =>{
    const descName = document.querySelector(selector);
    return descName.value
  },'textarea[name=descriere]')


  //email
  await page.evaluate((selector, value) => {
    const emailName = document.querySelector(selector);
    emailName.value = value;
  }, 'input[name="email"]', "admin@gmail.com");

  // Get the value of the input field
  const emailValue = await page.evaluate(selector => {
    const emailName = document.querySelector(selector);
    return emailName.value;
  }, 'input[name="email"]');


  // Take a screenshot of the captcha image
  const captchaElement = await page.$('img[src$="randomImage3.php"]');
  const captchaScreenshot = await captchaElement.screenshot();

  // Use tesseract.js to extract text from the captcha image
  const { data: { text } } = await Tesseract.recognize(captchaScreenshot);

  // Clean up the text
  const captchaValue = text.trim().replace(/[^A-Za-z0-9]/g, '');

    await page.evaluate((selector,value) =>{
    const captchaName = document.querySelector(selector);
    captchaName.value = value;
  },'input[name="txtNumber"]',captchaValue)

  const catValue = await page.evaluate(selector => {
    const catName = document.querySelector(selector);
    return catName.value;
  }, 'input[name="txtNumber"]');

  console.log(catValue);
  console.log(titleValue);
  console.log(urlValue);
  console.log(descValue);
  console.log(emailValue);


  await page.waitForSelector('input[type="Submit"]'); // Wait for the submit button to be present
  await page.click('input[type="Submit"]',{ timeout: 60000 });
  
  await page.waitForNavigation();

  await browser.close();

  console.log("done");
  
  }
catch (error) {
    }
}

getCaptchaValue();

