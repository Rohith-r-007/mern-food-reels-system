const foodPartnerModel = require('../models/foodpartner.model.js');
const foodModel = require('../models/food.model.js');

async function getFoodPartnerById(req, res) {
    try {
        const foodPartnerId = req.params.id;

        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

        if(!foodPartner) {
            return res.status(404).json({
                message: 'food partner not found'
            });
        }

        return res.status(200).json({
            message: 'food partner fetched successfully',
            foodPartner:{
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        });
    } catch (err) {
        console.error('Error fetching food partner by id:', err.message);
        return res.status(500).json({ message: 'internal server error' });
    }

}

module.exports = { getFoodPartnerById }
