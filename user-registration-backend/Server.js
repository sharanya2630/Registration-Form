const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/user-registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = new User({ fullName, email, password });
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
