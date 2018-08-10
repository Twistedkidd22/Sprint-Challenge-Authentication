const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig.js')


const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const secret = 'Why can’t banks keep secrets? There are too many tellers!'

function generateToken(user) {
  const payload = {
    username: user.username,
  }

  const options = {
    expiresIn: '1h',
    jwtid: '8728391',
  }

  return jwt.sign(payload, secret, options)
}

function register(req, res) {
  // implement user registration
  req.body.password = bcrypt.hashSync(req.body.password, 14)

  let { username, password } = req.body;
  let user = {
    username,
    password
  }
  db('users')
    .insert(user)
    .then(ids => {})
    .catch(err => res.status(500).json(err));

    const token = generateToken(user);
    res.status(200).json(token)
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;
  let credentials = {
    username,
    password
  }

  db('users')
  .where('username', credentials.username).first()
  .then(user => {
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return res.status(401).json({ error: 'invalid username or password' })
    } else {
      const token = generateToken(user)
      return res.send(token);
    }
  })
  .catch(err => {
    res.status(500).send('error logging in...')
  })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
