const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('No token , authorization  denied');
    } try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Token invalide');
    }
};

module.exports = auth;

// const Beard = req.header.Authorization;
// console.log(Beard);
// const token = Beard.split(' ')[1];
// console.log(token[0]);
// console.log(token[1]);