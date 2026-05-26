try {
  require('dotenv').config({ path: './backend/.env' });
} catch (e) {
  require('dotenv').config();
}
const mongoose = require('mongoose');
const FoodPartner = require('../src/models/foodpartner.model.js');

const id = process.argv[2];
if(!id) {
  console.error('Usage: node findPartner.js <id>');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const partner = await FoodPartner.findById(id).lean();
    if(!partner) {
      console.log('NOT_FOUND');
    } else {
      console.log('FOUND:', JSON.stringify(partner, null, 2));
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error('DB_CONNECT_ERROR', err.message);
    process.exit(1);
  });
