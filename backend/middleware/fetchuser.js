const jwt = require('jsonwebtoken');
const JWT_SECRET = 'nazarisagoodb$oy'; // default secret value and should be matched with the auth

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token'); // the token auth value will go to the header from thunder client
    if (!token) {
        return res.status(401).send({ error: "please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET); // here jwt secret  is matching with the token that comes from the header from thunderclient
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: "please authenticate using a valid token" });
    }

}


module.exports = fetchuser;