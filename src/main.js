const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.use('/api/books', bookRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/users', userRoutes);

const { SERVER_HOST, SERVER_PORT } = process.env;
const port = SERVER_PORT || 9090;

app.use(express.json());

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server running on ${SERVER_HOST}:${SERVER_PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});