require('dotenv').config();

const jwt = require('jsonwebtoken');
const { Router } = require('express');
const {authenticateHeader,authenticateToken } = require('../mw');
const db = require('../db');
const router = Router();

router.post('/', [authenticateHeader, authenticateToken], async (req, res) => {
    const { amount, description } = req.body;
    // console.log(req.response.id);
    if (amount <= 0) {
        res.status(401).json({ message: 'Balance value must be greater than zero.' });
    }

    const query= await db.promise().query(`SELECT user_balance from users where user_id = ?`, [req.response.id])
    const result = query[0][0];

    if (result <= amount) {
        res.status(401).json({message: 'insufficent balance in your account. Please topup.'})
    }

    const date = new Date();
    const timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    db.execute(
        "insert INTO transaction (user_id,transaction_amount,transaction_date,transaction_description) VALUES (?,?,?,?)", [req.response.id, amount, timestamp,description], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json("server error");
            }
        }
    );

    db.execute(
        "UPDATE users SET user_balance=user_balance-? WHERE user_id=?", [amount, req.response.id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json("server error");
            }
        }
    );
    return res.status(200).json({message: 'transaction success'})

})


module.exports = router;