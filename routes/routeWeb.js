const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', {title : "my dynamic title"}); // render comes from ejs, to render html
    console.log(__dirname);
});

router.get('/services', (req, res) => {
    res.render('services', {services: 'this is a dynamic message of services'});
});

module.exports = router;