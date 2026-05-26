try { require('dotenv').config({ path: './backend/.env' }); } catch(e) { require('dotenv').config(); }
const jwt = require('jsonwebtoken');
const id = process.argv[2];
if(!id) { console.error('Usage: node generateToken.js <id>'); process.exit(1); }
const token = jwt.sign({ id }, process.env.JWT_SECRET);
console.log(token);
