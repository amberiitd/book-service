require("dotenv").config();
const bookErrorHandler = require("./middleware/bookErrorMiddleware");
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const booksRoute = require('./routes/books');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);
app.use('/books', authenticateToken, booksRoute, bookErrorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
