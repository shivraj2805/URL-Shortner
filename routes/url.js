const express= require('express');
const { handleShortUrl,getAnalytics } = require('../controllers/url');

const router = express.Router();

router.post("/",handleShortUrl);

router.get("/analytics/:shortId",getAnalytics )

module.exports = router;