require('dotenv').config()
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);

    if (token == null) return res.status(401).json({
        status: 401,
        msg: "Bearer token not found"
    });

    jwt.verify(token, process.env.dbsecrectoken, (err, response) => {
        if (err) return res.status(403).json({
            status: 403,
            msg: "invalid token"
        });
        req.response = response;
        next();
    })

}

function authenticateHeader(req, res, next) {
    const header = req.get("content-Type");
    console.log(header);
    if (header != "application/json") return res.status(403).json({
        status: 403,
        msg: "invalid header type"
    });
    next();
}

function rolecheck(req, res, next) {
    if (req.response.id != "1" ) {
        return res.status(403).json({
            status: 403,
            msg: "forbidden"
        });
    }
    next();
}

module.exports = { authenticateToken, authenticateHeader, rolecheck };