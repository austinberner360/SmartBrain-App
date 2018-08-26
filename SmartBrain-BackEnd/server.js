const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs'); //ALWAYS SEND SENSITIVE INFORMATION THROUGH HTTPS, POST body, WITH ENCRYPTION SUCH AS 'bcrypt'
const cors = require('cors');
const knex = require('knex'); //this section involves a package that supports connection methods to the server
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Mara36994*',
    database : 'smart_brain'
  }
});


const app = express();
app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res)=> { res.send(database.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(3000, () => {
	console.log('app is running on port 3000');
})

// console.log(process.env) = when run in node server, displays environmental data


// const DATABASE_URL = process.env.DATABASE_URL
// app.listen(3000, () => {
// 	console.log(`Server is listening on port ${DATABASE_URL}`);
// });

// console.log(3000)