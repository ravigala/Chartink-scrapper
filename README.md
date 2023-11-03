# Chartink-scrapper

Chartink Scrapper is a Node.js application that leverages Puppeteer to scrape data from a given Chartink scanner URL. The application initiates a headless browser, navigates through the paginated data on the Chartink website, and extracts stock-related information. The data is formatted in batches of 30, making it suitable for direct use in TradingView free verion. The project enhances modularity by separating concerns into different services, such as puppeteerService for browser management and dataFormatService for formatting fetched data.

## Table of Contents
- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Usage](#usage)


## Overview

This project provides a Node.js application that takes a Chartink scanner URL as input and formats the data in batches of 30. The formatted data can be directly pasted into TradingView.

## Folder Structure

The project is organized into several directories to improve code organization and maintainability:

- `src/controllers`: Contains the HTTP request/response logic.
- `src/services`: Includes business logic for fetching data using Puppeteer and formatting the data.
- `src/utils`: Houses reusable utility functions, such as delay.
- `src/routes.js`: Defines the Express route for fetching chart data.
- `src/app.js`: Initializes the Express application.

## Installation

1. To install the required dependencies, run:

```
npm install
```

2. Start the application by running:
```
npm start
```

## Usage

1. Make a POST request to the `/fetch-chart-data` endpoint with a JSON payload containing the Chartink scanner URL using Postman or any other similar tool

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"url": "YOUR_CHARTINK_SCANNER_URL"}' http://localhost:3000/fetch-chart-data
    ```

2. The application will process the Chartink data and format it into groups of 30 stocks each. The response will be in the following format:

    ```json
    {
        "status": "success",
        "msg": {
            "group1": [
                "NSE:RELIANCE",
                "NSE:HDFCBANK",
                // ... (List of 30 stocks)
            ],
            "group2": [
                // ... (List of 30 stocks)
            ],
            "group3": [
                // ... (List of 30 stocks)
            ]
            //... and so on
        }
    }
    ```

3. Copy the relevant stock groups from the response and directly paste them into TradingView for analysis.

