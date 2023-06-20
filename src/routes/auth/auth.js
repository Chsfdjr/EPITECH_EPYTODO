const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodeParser = bodyParser.urlencoded({extended: false});

router.post('/register', jsonParser, async (req, res) => {
    try {
        const [exist] = await db.promise().query('SELECT * FROM user WHERE email = ?', [req.body.email]);
        if (exist.length > 0) {
            return res.status(400).json({"msg":"account already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const [rows] = await db.promise().query('INSERT INTO user (email, last_name, first_name, password) VALUES (?, ?, ?, ?)', [
            req.body.email,
            req.body.name,
            req.body.firstname,
            hash,
        ]);

        const token = jwt.sign({ id: rows.insertId }, process.env.SECRET, { expiresIn: 3600 });
        res.status(200).json({ token: token});
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.post('/login', jsonParser, async (req, res) => {
    try {
        const exist = await db.promise().query('SELECT * FROM user WHERE email = ?', [req.body.email]);
        if (exist[0].length == 0) {
            return res.status(401).json({"msg":"Invalid Credentials"});
        } else {
            const connected = bcrypt.compareSync(req.body.password, exist[0][0].password);
            if (connected) {
                const token = jwt.sign({id : exist[0][0].id }, process.env.SECRET, { expiresIn: 3600 });
                return res.status(200).json({token: token});
            } else {
                return res.status(401).json({"msg":"Invalid Credentials"});
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({"msg":"internal server error"});
    }
});

module.exports = (app) => {
    app.use(router);
    app.use(bodyParser.json());
};