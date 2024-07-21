const express = require('express');
const cors = require('cors');
require('./config/connection');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');



const app = express();

app.use(express.json());
app.use(cors());


app.use('/users', userRoutes);
app.use('/books', bookRoutes);



app.listen(3005, () => {
    console.log('Server is running on port 3005');
});
