require("dotenv").config();
const bookErrorHandler = require("./middleware/bookErrorMiddleware");
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const booksRoute = require('./routes/books');
const { authenticateToken } = require('./middleware/authMiddleware');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const { rateLimiter } = require("./middleware/rateLimiterMiddleware");

// app
const app = express();
const port = process.env.PORT || 3000;

// middlwares
app.use(bodyParser.json());
app.use(passport.initialize());


// Swagger options
const swaggerOptions = {
  swaggerDefinition: YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml')),
  apis: ['./routes/*.js'], // Specify the routes containing Swagger annotations
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/books', authenticateToken, rateLimiter, booksRoute, bookErrorHandler);

// default route handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
