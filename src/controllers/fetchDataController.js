const { fetchData } = require('../services/puppeteerService');
const { formatData } = require('../services/dataFormatService');

async function fetchChartData(req, res) {
  try {
    const url = req.body.url;
    const response = await fetchData(url);

    if (response.length === 1 && response[0][filteredResponse0] === 'No stocks filtered in the Scan') {
      return res.json({
        status: 'success',
        msg: response,
      });
    }

    const formattedResponse = await formatData(response);
    return res.json(formattedResponse);
  } catch (err) {
    console.log('Error in fetchChartData: ', err);
    return res.json({
      status: 'error',
      msg: 'An error occurred',
    });
  }
}

module.exports = { fetchChartData };
