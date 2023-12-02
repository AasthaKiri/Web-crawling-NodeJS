

const puppeteer = require('puppeteer');
const { response } = require('express');
// url = "https://globalclassified.net/index.php?view=post&cityid=389&lang=en&catid=1&subcatid=1&shortcutregion=0"

// request(url , (error,response,html) =>{
//     if(!error && response.statusCode ===200){
//         const $ = cheerio.load(html)
//         const title = $('title').text()
        async function onlineForm(){

          try {
            
            // Launch a new headless browser instance
            const browser = await puppeteer.launch();
          
            // Create a new page and navigate to the form URL
            const page = await browser.newPage();
            await page.goto('https://freeadsonline.biz/index.php?view=post&postevent=&cityid=389&lang=en&catid=1&subcatid=1');

            //title
            await page.evaluate((selector, value) => {
                const titleName = document.querySelector(selector);
                titleName.value = value;
              }, 'input[name="adtitle"]', "Online Data Reference");
            
              // Get the value of the input field
              const titleValue = await page.evaluate(selector => {
                const titleName = document.querySelector(selector);
                return titleName.value;
              }, 'input[name="adtitle"]');

              //post
              await page.evaluate((selector, value) => {
                const postName = document.querySelector(selector);
                postName.value = value;
              }, 'textarea[name="addesc"]',"Services provided for getting good reference for the data.");
            
              // Get the value of the input field
              const postValue = await page.evaluate(selector => {
                const postName = document.querySelector(selector);
                return postName.value;
              }, 'textarea[name="addesc"]');

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

              //checkbox
              await page.evaluate((selector, value) => {
                const checkbox = document.querySelector(selector);
                checkbox.checked = value;
              }, 'input[name="agree"]', true);
              
              console.log(titleValue); 
              console.log(postValue);
              console.log(emailValue);

              // await page.evaluate(() => {
              //   document.querySelector('button[type="submit"]').click();
              // }, { timeout: 60000 });

              await page.waitForSelector('button[type="submit"]'); // Wait for the submit button to be present
              await page.click('button[type="submit"]',{ timeout: 60000 });
              
              await page.waitForNavigation();
              
              await browser.close();

              console.log("Done");


        }
      catch (error) {
            console.log(error);
      }
    }
        onlineForm()
    // }

    // else{
    //     console.log(error);
    // }
// })
