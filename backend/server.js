const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
    {   useNewUrlParser: true, 
        useCreateIndex: true,
        useUnifiedTopology: true
    }
).then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB is Running and Connection Established successfully');
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build'));
});

app.listen(port, () => {
    console.log(`Server is Running on port: ${port}`);
})