const puppeteer = require('puppeteer');
const delay  = require('../utils/delay');

async function initializeBrowser() {
  try {
    return await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
  } catch (error) {
    console.error('Error launching browser:', error);
    throw error;
  }
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

async function waitForData(page) {
  await page.waitForFunction(() => document.querySelectorAll('#DataTables_Table_0 tr').length >= 1, { timeout: 10000 });
}

async function getPaginationClassName(page) {
  return page.evaluate(() => {
    return document.querySelectorAll('#DataTables_Table_0_next')[0].className;
  });
}

async function getResult(page) {
  return page.evaluate(() => {
    const rows = document.querySelectorAll('#DataTables_Table_0 tr');
    return Array.from(rows, (row) => {
      const columns = row.querySelectorAll('td');
      return Array.from(columns, (column) => column.innerText);
    });
  });
}

async function goToNextPage(page) {
  await page.evaluate(() => {
    const elem = document.querySelectorAll('#DataTables_Table_0_next')[0];
    elem.click();
  });
}

async function closeBrowser(browser) {
  await browser.close();
}

module.exports = { initializeBrowser, fetchData, closeBrowser };
