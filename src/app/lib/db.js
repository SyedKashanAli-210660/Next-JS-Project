
require('dotenv').config({ path: '../../.env.local' }); // Adjust path if necessary

const connectionStr = process.env.MONGODB_URI;

module.exports = {
    connectionStr
};
