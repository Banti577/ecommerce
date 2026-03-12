const express = require('express');
const router = express.Router();

const path = require('path')
const fs = require('fs')

router.get('/', (req, res) => {
    return res.send('no fff')
})

router.get('/video', (req, res) => {
    const videoPath = path.join(__dirname, '..', 'public', 'videos', 'birdsvideo.mp4');
    const stat = fs.statSync(videoPath);
    console.log('path', videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {


        res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        });
        fs.createReadStream(videoPath).pipe(res);
        return;
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;


    if (start >= fileSize || end >= fileSize) {
        res.writeHead(416, {
            'Content-Range': `bytes */${fileSize}`,
        });
        return res.end();
    }

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    
    res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
    });

    file.pipe(res);
});


module.exports = router;