const express = require('express');
const { fetchChartData } = require('./controllers/fetchDataController');

const router = express.Router();

router.post('/fetch-chart-data', fetchChartData);

module.exports = router;
