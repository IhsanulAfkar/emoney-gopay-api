require('dotenv').config()

const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { authenticateToken, authenticateHeader } = require('../mw');
const db = require('../db');

const router = Router();

router.get('/', [authenticateToken], async (req, res) => {
    const queryResult = await db.promise().query(`SELECT user_phone, user_email, user_name, user_balance FROM users WHERE user_id=${req.response.id} LIMIT 1`);
    const result = queryResult[0][0];
    res.status(200).json({
        status: 200,
        data: result
    });
})

router.post('/', (req, res) => {
    const { email, password, phone } = req.body;
    if (email) {
        db.query(`SELECT * FROM users WHERE user_email=? LIMIT 1`, [email], (err, result, fields) => {
            result = result[0];
            // console.log(result);

            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    msg: 'Server error'
                });
            }
            if (!result || result.user_pass !== password)
                return res.status(401).json({
                    status: 401,
                    msg: 'Invalid email/phone number or password. please create an account if you dont have one'
                });

            const token = jwt.sign({
                id: result.user_id,
                username: result.user_name,
            }, process.env.dbsecrectoken, { expiresIn: '3d' });
            res.status(200).json({
                status: 200,
                msg: 'login success!',
                token: token
            });
        });
    } else if (phone) {
        db.query(`SELECT * FROM users WHERE user_phone=? LIMIT 1`, [phone], (err, result, fields) => {
            result = result[0];
            // console.log(result);
            // console.log(result.user_pass);
            
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    msg:'server error'
                });
            }
            if (!result || result.user_pass !== password)
                return res.status(401).json({
                    status: 401,
                    msg: 'Invalid email/phone number or password. please create an account if you dont have one'
                });

            const token = jwt.sign({
                id: result.user_id,
            }, process.env.dbsecrectoken, { expiresIn: '3d' });
            res.status(200).json({
                status:200,
                msg: 'login success!',
                token: token
            });
        });
    } else {
        res.status(400).json({
            status : 400,
            msg: 'Invalid Parameters'
        });
    }
});

module.exports = router;