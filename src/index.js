const express = require('express');
var bcrypt = require('bcryptjs');
const app = express();

const port = 5000;
require('dotenv').config();

const userRoutes = require('./routes/user/user');
const authRoutes = require('./routes/auth/auth');
const todosRoutes = require('./routes/todos/todos');
userRoutes(app);
authRoutes(app);
todosRoutes(app);

app.listen(port, () => {
    console.log(`Epytodo can be accessed at http://localhost:${port}`)
});
