const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});

    const shortId= nanoid(8);
    await URL.create({
        redirectUrl: body.url,
        shortId: shortId,
        visitHistory: [],
        createdBy: req.user._id
    });

    return res.render('home',{
        id: shortId,
        urls: await URL.find({})
    });
}


async function getAnalytics(req, res){
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOne({ shortId: shortId });
    return res.json({ 
        totalClicks: urlEntry.visitHistory.length,
        visitHistory: urlEntry.visitHistory
    });
}


module.exports = {handleShortUrl,getAnalytics};