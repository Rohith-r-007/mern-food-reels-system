const foodModel = require('../models/food.model.js');
const storageService = require('../services/storage.services.js');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    const ext = req.file.originalname.split('.').pop();

    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const fileUploadResult = await storageService.uploadFile(base64File, `${uuid()}.${ext}`);
    
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: 'food item created successfully',
        foodItem
    })
}

async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({

    })

    res.status(200).json({
        message: 'food items fetched successfully',
        foodItems
    })
}


module.exports = {
    createFood,
    getFoodItems
}