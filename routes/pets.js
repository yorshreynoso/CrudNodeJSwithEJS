const express = require('express');
const router  = express.Router();
const Pet     = require('../models/pet');

router.get('/', async(req, res) => {
    try {
        const arrayPet = await Pet.find();
        res.render('pets', { arrayPet }); // using res.render we send the view's name, in this case is called 'pets'
    } catch (error) {
        console.log(error);
    }

    // res.render('pets', {
    //     arrayPet : [
    //         { id:'1_example', name:'mulan', description: 'mulanoman' },
    //         { id:'2_example', name:'lancha', description:'lanchosauria' }
    //     ]
    // });
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        const petDB = new Pet(body);
        await petDB.save();
        console.log(`Pet created with name: ${body.name}`);
        res.redirect('/pets');
    } catch (error) {
        console.log(error);
    }
});


router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
       const petDB = await Pet.findOne({_id : id });
       res.render('detail', {
           pet  : petDB,
           error: false
       });
    } catch (error) {
        console.log(error);
        res.render('detail', {
            error: true,
            message:'The Id could not be found'
        })
    }
}); 

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const petDB = await Pet.findByIdAndDelete({_id: id });
        if(petDB) {
            res.json({
                state: true,
                message: 'delete it'
            });
        } else {
            res.json({
                    state: false,
                    message: 'the id could not be delete it'
            });
        }

        
    } catch (error) {
        console.log('The id could not be deleted');
    }
});


router.put("/:id", async(req, res) => {
    id      = req.params.id;
    body    = req.body;

    try {
        const petDB = await Pet.findByIdAndUpdate( id, body, { useFindAndModify: false} );
        console.log(petDB);
        res.json({
            state: true,
            message:"Edit it correctly"
        });

    } catch (error) {
        console.log(error);
        res.json({
            state: false,
            message: "Error to Edit"
        });
    }
})

module.exports = router;