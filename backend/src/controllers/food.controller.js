const foodModel = require('../models/food.model.js');
const storageService = require('../services/storage.services.js');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {

    console.log(req.foodPartner);

    console.log(req.body);
    console.log(req.file);

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    console.log(fileUploadResult);

    res.send('food created');
}


module.exports = {
    createFood
}