const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host: "dpg-chlq9ae4dadfmshonl5g-a.oregon-postgres.render.com",
    port: 5432,
    user: "suraj",
    password: "8wpWrluxCMJtxZq4x9sF7ZG6SxWlhAIl",
    database: "smartbrain_jb23",
    ssl: { rejectUnauthorized: false }
  }
});


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('success') })
// app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`);
});
