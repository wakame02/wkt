const axios = require("axios");
const express = require("express");
const router = express.Router();
const path = require("path");
const http = require('http');
const serverYt = require("/app/server/youtube.js");

router.get('/edu/:id', async (req, res) => {
  const videoId = req.params.id;
  try {
    const videoData = await serverYt.infoGet(videoId);
    const ytinfo = await axios.get("https://wktedutube.glitch.me");
    const videosrc = `https://www.youtubeeducation.com/embed/${videoId}${ytinfo.data}`;
          
    res.render('tube/umekomi.ejs', {videosrc, videoData});
  } catch (error) {
     res.status(500).render('matte', { 
      videoId, 
      error: '動画を取得できません', 
      details: error.message 
    });
  }
});

module.exports = router;