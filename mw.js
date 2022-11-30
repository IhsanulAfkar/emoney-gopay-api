require('dotenv').config()
const jws = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token = token == null) return res.status(401).json("Bearer token not found");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, response) => {
        if (err) return res.status(403).json("invalid token");
        req.response = response;
        next();
    })

}

function authenticateHeader(req, res, next) {
    const header = req.get("content-Type");
    // console.log(header);
    if (header != "application/json") return res.status(403).json("invalid header type");
    next();
}

// function checkAdmin(req, res, next) {
//     if (req.response.role != "1") {
//         return res.status(403).json("forbidden");
//     }
//     next();
// } g kepakeaeaeae

module.exports = { authenticateToken, authenticateHeader };