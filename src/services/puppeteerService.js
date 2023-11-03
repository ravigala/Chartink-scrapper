const puppeteer = require('puppeteer');

async function initializeBrowser() {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
}

async function fetchData(browser, url) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
  
    let runningStatus = true;
    let response = [];
  
    do {
      try {
        await waitForData(page);
        const paginationClassName = await getPaginationClassName(page);
        const result = await getResult(page);
  
        if (result[0].length < 1) result.shift();
  
        response = response.concat(result);
  
        if (paginationClassName.includes('disabled')) {
          runningStatus = false;
        } else {
          await delay(1000);
          await goToNextPage(page);
        }
      } catch (err) {
        console.log('Error in fetchData: ', err);
        runningStatus = false;
      }
    } while (runningStatus);
  
    await page.close();
    return response;
  }

async function closeBrowser(browser) {
  await browser.close();
}

module.exports = { initializeBrowser, fetchData, closeBrowser };
