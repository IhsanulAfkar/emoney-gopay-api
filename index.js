require('dotenv').config();

const express = require('express');
const user_routes = require('./routes/users');
// const register_routes = require('./routes/register');
// const topup_routes = require('./routes/topup');
// const transfer_routes = require('./routes/transfer');
// const pay_routes = require('./routes/pay');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/users', user_routes);
// app.use('/api/register', register_routes);
// app.use('/api/topup', topup_routes);
// app.use('/api/pay', pay_routes);

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(` listening on port ${port}...`))