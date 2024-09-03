const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes'); // Assuming you have a similar setup for books
const sequelize = require('./config/database');

const app = express();

app.use(express.json());

app.use('', userRoutes);

app.use('', bookRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
