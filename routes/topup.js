require('dotenv').config()

const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { rolecheck, authenticateToken, authenticateHeader } = require('../mw');
const db = require('../db');
const router = Router();


router.post('/', [authenticateToken, authenticateHeader, rolecheck], async (req, res) => {
    const { amount, target } = req.body;
    if (amount <= 0) {
        return res.status(401).json({
            status: 401,
            msg: "Balance value must be greater than zero"
        });
    }

    const queryresult = await db.promise().query("select * from users where user_phone =?", [target]);
    const result = queryresult[0][0];
    if (!result) {
        return res.status(401).json({
            status: 401,
            msg: "user not found"
        });
    }

    const date = new Date();
    const timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const query3 = await db.promise().query(`SELECT user_id from users where user_phone = ?`, [target])
    const result3 = query3[0][0];
    // console.log(result3.user_id)
    db.execute(
        "insert INTO topup (user_id,topup_amount,topup_date) VALUES (?,?,?)", [result3.user_id, amount, timestamp], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    msg: "server error"
                });
            }
        }
    );
    db.execute(
        "UPDATE users SET user_balance=user_balance+? WHERE user_phone=?", [amount, target], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    msg: "server error"
                });
            }
        }
    );
    // console.log(1);
    return res.status(200).json({
        status: 200,
        msg: "Topup success"
    })

})

module.exports = router;