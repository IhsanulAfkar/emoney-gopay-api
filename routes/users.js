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
        db.query(`SELECT * FROM users WHERE phonclear
        e=? LIMIT 1`, [phone], (err, result, fields) => {
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




module.exports = router;