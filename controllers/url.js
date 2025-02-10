const{nanoid}=require("nanoid");
const URL=require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'Url is required'})
    const shortID=nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    });
    return res.json({id:shortID});
}
module.exports={
    handleGetAnalytics,
    handleGenerateNewShortURL,
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
