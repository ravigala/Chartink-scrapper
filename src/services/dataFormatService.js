async function formatData(response) {
  try {
      let stockSymbols = {};

      for (let i = 0; i < response.length; i++) {
          let stock = response[i];
          let stockName = 'NSE:' + stock[2].replace('-', '_').replace('&', '_');
          let groupNumber = Math.ceil((i + 1) / 30);
          let groupName = 'group' + groupNumber;

          if (!stockSymbols[groupName]) {
              stockSymbols[groupName] = [];
          }

          stockSymbols[groupName].push(stockName);
      }

      console.log(stockSymbols);

      const formattedResponse = {
          status: "success",
          msg: stockSymbols
      };

      return formattedResponse;

  } catch (error) {
      console.error("An error occurred:", error);
  }
}

module.exports = { formatData };
