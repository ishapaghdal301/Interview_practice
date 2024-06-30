const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const connectDB = require('./src/config/db');
const todoRouter = require('./src/routes/todo_route');

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the to-do routes
app.use('/api', todoRouter);

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
