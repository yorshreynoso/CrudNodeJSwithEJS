const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;


const petSchema = new Schema( {
    name: String,
    description: String
});

//create the model
const Pet = mongoose.model('pet', petSchema, 'inventoryPet');



module.exports = Pet;