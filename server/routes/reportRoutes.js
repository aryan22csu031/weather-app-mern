const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const { getSearchReports } = require('../models/searchModel');

const router = express.Router();

router.get('/report', authenticate, async (req, res) => {
  try {
    const reports = await getSearchReports();
    console.log(reports);
    
    res.json({ data: reports });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch reports' });
  }
});

module.exports = router;
