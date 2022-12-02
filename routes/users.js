require('dotenv').config()

const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { authenticateToken, authenticateHeader } = require('../mw');
const db = require('../db');

const router = Router();

router.post('/', (req, res) => {
    const { email, password, phone } = req.body;
    if (email) {
        db.query(`SELECT * FROM users WHERE user_email=? LIMIT 1`, [email], (err, result, fields) => {
            result = result[0];
            // console.log(result);

            if (err) {
                console.log(err);
                return res.status(401).json('Server error');
            }
            if (!result || result.user_pass !== password)
                return res.status(401).json('Invalid email/phone number or password');

            const token = jwt.sign({
                id: result.user_id,
                username: result.user_name,
            }, process.env.secrectoken, { expiresIn: '1d' });
            res.status(200).json({
                msg: 'login success!',
                token: token
            });
        });
    } else if (phone) {
        db.query(`SELECT * FROM users WHERE user_id=? LIMIT 1`, [phone], (err, result, fields) => {
            result = result[0];
            // console.log(result);
            // console.log(result.user_pass);
            

            if (err) {
                console.log(err);
                return res.status(401).json('Server error');
            }
            if (!result || result.pass !== password)
                return res.status(401).json('Invalid email/phone number or password');

            const token = jwt.sign({
                id: result.user_id,
                username: result.username,
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            res.status(200).json({
                msg: 'login success!',
                token: token
            });
        });
    } else {
        res.status(400).json({ msg: 'Invalid Parameters' });
    }
});

// router.get('/history', authenticateToken, async (req, res) => {
//      const queryResult = await db.promise().query(`SELECT * FROM transaction WHERE user_phone=?`, [req.response.id]);
//     const transaction = queryResult[0];

//     // const queryResult2 = await db.query(`SELECT * FROM topup WHERE user_phone=$1`, [req.response.phone]);
//     const queryResult2 = await db.promise().query(`SELECT * FROM topup WHERE user_phone=?`, [req.response.id]);
//     const topup = queryResult2[0];

    
//     const queryResult3 = await db.promise().query(`SELECT * FROM transfer WHERE user_phone=? OR user_target_phone=?`, [req.response.phone, req.response.id]);
//     const transfer = queryResult3[0];
// })




module.exports = router;