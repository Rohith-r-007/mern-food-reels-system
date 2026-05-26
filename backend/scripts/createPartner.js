try {
  require('dotenv').config({ path: './backend/.env' });
} catch (e) {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const FoodPartner = require('../src/models/foodpartner.model.js');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const partner = new FoodPartner({
    name: 'Test Partner',
    contactName: 'Test Contact',
    phone: '1234567890',
    address: '123 Test St',
    email: `testpartner_${Date.now()}@example.com`,
    password: 'hashedpassword'
  });
  await partner.save();
  console.log('CREATED_ID', partner._id.toString());
  process.exit(0);
}

run().catch((err) => {
  console.error('ERROR', err.message);
  process.exit(1);
});
