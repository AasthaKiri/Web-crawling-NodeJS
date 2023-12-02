const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch()
    const page  = await browser.newPage()

    await page.goto("https://activdirectory.net/submit")

    // await page.click()
    const mainData = await page.evaluate(()=>{
        return fetch("https://activdirectory.net/categ_tree_ajax.php?actnion=categtree")
        .then(response => response.json())
        .then(data => data)
    })
    // console.log(mainData);

    async function subData (jsonArray)
    {
        if (jsonArray != undefined && jsonArray != null && jsonArray.length > 0)
        {
            for(let i=0 ; i< jsonArray.length ;i++)
            {
                const title = jsonArray[i].title
                const key = jsonArray[i].key

                const subObj = await page.evaluate((title,key)=>{
                    return fetch(`https://activdirectory.net/categ_tree_ajax.php?key=${key}&action=categtree`)
                    .then(response => response.json())
                    .then(data => {
                        const sData = data;
                        const subObj = {title , data:sData}
                        return subObj
                    })
                },title,key);

                console.log(subObj);

                //this code to use if there is sub sub data it arts : animation : data

                // if (subObj.data != undefined && subObj.data != null && subObj.data.length > 0)  {
                //     console.log(subObj);
                //     await subData(subObj.data)
                // }              
            }

        }
    }

    await subData(mainData);

    await browser.close();
})()
