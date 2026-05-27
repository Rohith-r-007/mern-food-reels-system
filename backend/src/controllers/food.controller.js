const foodModel = require('../models/food.model.js');
const likesModel = require('../models/likes.model.js');
const savedModel = require('../models/saved.models.js');
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
    const user = req.user;

    const foods = await foodModel.find({});

    const foodIds = foods.map((f) => f._id);
    const [likedDocs, savedDocs] = await Promise.all([
        likesModel.find({ user: user._id, food: { $in: foodIds } }).select('food'),
        savedModel.find({ user: user._id, food: { $in: foodIds } }).select('food')
    ]);

    const likedSet = new Set(likedDocs.map((d) => d.food.toString()));
    const savedSet = new Set(savedDocs.map((d) => d.food.toString()));

    const foodItems = foods.map((food) => {
        const obj = food.toObject();
        const idStr = obj._id?.toString?.() ?? String(obj._id);
        return {
            ...obj,
            isLiked: likedSet.has(idStr),
            isSaved: savedSet.has(idStr),
            // Backwards-compat alias used by some UI code
            savesCount: obj.saveCount ?? 0
        };
    });

    res.status(200).json({
        message: 'food items fetched successfully',
        foodItems
    });
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
        return res.status(400).json({ message: 'foodId is required' });
    }

    const isLiked = await likesModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isLiked) {
        await likesModel.deleteOne({
            user: user._id,
            food: foodId
        });

        const updated = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { likeCount: -1 } },
            { new: true }
        );

        return res.status(200).json({
            message: 'food unliked successfully',
            like: false,
            likeCount: updated?.likeCount ?? 0
        });
    } else {
        await likesModel.create({
            user: user._id,
            food: foodId
        });

        const updated = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { likeCount: 1 } },
            { new: true }
        );

        return res.status(200).json({
            message: 'food liked successfully',
            like: true,
            likeCount: updated?.likeCount ?? 0
        });
    }
}

async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
        return res.status(400).json({ message: 'foodId is required' });
    }

    const isSaved = await savedModel.findOne({
        user: user._id,
        food: foodId
    })
    if (isSaved) {
        await savedModel.deleteOne({
            user: user._id,
            food: foodId
        })

        const updated = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { saveCount: -1 } },
            { new: true }
        );

        return res.status(200).json({
            message: 'food unsaved successfully',
            save: false,
            saveCount: updated?.saveCount ?? 0
        })
    }
    else {
        await savedModel.create({
            user: user._id,
            food: foodId
        })
        const updated = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { saveCount: 1 } },
            { new: true }
        );
        return res.status(200).json({
            message: 'food saved successfully',
            save: true,
            saveCount: updated?.saveCount ?? 0
        })
    }
}

async function getSavedFoodItems(req, res) {
    const user = req.user;

    const savedDocs = await savedModel
        .find({ user: user._id })
        .populate('food');

    const foods = savedDocs.map((doc) => doc.food).filter(Boolean);
    const foodIds = foods.map((f) => f._id);

    const likedDocs = await likesModel.find({
        user: user._id,
        food: { $in: foodIds }
    }).select('food');

    const likedSet = new Set(likedDocs.map((d) => d.food.toString()));

    const foodItems = foods.map((food) => {
        const obj = food.toObject();
        const idStr = obj._id?.toString?.() ?? String(obj._id);
        return {
            ...obj,
            isSaved: true,
            isLiked: likedSet.has(idStr),
            // Backwards-compat alias used by some UI code
            savesCount: obj.saveCount ?? 0
        };
    });

    res.status(200).json({
        message: 'saved food items fetched successfully',
        foodItems
    });
}

module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoodItems
}