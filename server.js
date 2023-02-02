
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

const port = process.env.PORT || 3000;


app.listen(port, () => {
   console.log(`App running on port ${port}...`);
});

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
   console.log('DB connection successful!');
});
