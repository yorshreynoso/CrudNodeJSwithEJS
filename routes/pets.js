const express = require('express');
const router  = express.Router();
const Pet     = require('../models/pet');

router.get('/', async(req, res) => {
    try {
        const arrayPet = await Pet.find();
        res.render('pets', { arrayPet });
    } catch (error) {
        console.log(error);
    }


    // res.render('pets', {
    //     arrayPet : [
    //         { id:'1_example', name:'mulan', description: 'mulanoman' },
    //         { id:'2_example', name:'lancha', description:'lanchosauria' }
    //     ]
    // });
})


module.exports = router;