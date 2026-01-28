const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('racm e');
    return res.send('no fff')
})

module.exports = router;