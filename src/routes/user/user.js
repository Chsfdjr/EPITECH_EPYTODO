const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();   

const check_email = (req, res, next) => {
    const parameters = req.params.id;
    if (!parameters) {
        return res.status(400).send('Bad parameter');
    }
    const handle_error = parameters.split('@');
    if (handle_error[1]) {
        next();
    } else {
        return res.status(400).send('Bad parameter');
    }
};

router.get('/user', auth, async (req, res) => {
    try {
        const user = await db.promise().query('SELECT * FROM user WHERE id = ?', [req.user.id]);
        if (user[0].length == 0) {
            return res.status(404).json('Not found');
        } else {
            return res.status(400).json(user[0][0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.get('/user/todo', auth, async (req, res) => {
    try {
        const user = await db.promise().query('SELECT * FROM user WHERE id = ?', [req.user.id]);
        if (user[0].length == 0) {
            return res.status(404).json('Not found');
        } else {
            return res.status(400).json(user[0][0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }});

router.get('/users/:id', auth, check_email, jsonParser, async (req, res) => {
    try {
        const exist_id = await db.promise().query('SELECT * FROM user WHERE id = ?', [req.params.id]);
        const exist_email = await db.promise().query('SELECT * FROM user WHERE email = ?', [req.params.id]);
        if (exist_id[0].length == 0 && exist_email[0].length == 0) {
            return res.status(404).json('Not found');
        }
        if (req.user.id == req.params.id || exist_email[0][0].email == req.params.id) {
            if (exist_id[0].length > 0) {
                return res.status(400).json(exist_id[0][0]);
            } else {
                return res.status(400).json(exist_email[0][0]);
            }
        } else {
            res.status(498).json('Token is not valid');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.put('/users/:id', auth, jsonParser, async (req, res) => {
    try {
        const exist = await db.promise().query('SELECT * FROM user WHERE id = ?', [req.params.id]);
        if (exist[0].length == 0) {
            return res.status(404).json('Not found');
        }
        if (req.user.id == req.params.id) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            const update_user = await db.promise().query('UPDATE user SET email = ?, last_name = ?, first_name = ?, password = ? where id = ?', [
                req.body.email,
                req.body.name,
                req.body.firstname,
                hash,
                req.params.id
            ]);
            if (update_user) {
                const new_profil = await db.promise().query('SELECT * FROM user WHERE id = ?', [req.params.id]);
                res.status(400).json(new_profil[0][0]);
            }
        } else {
            res.status(498).json('Token is not valid');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.delete('/users/:id', auth, jsonParser, async (req, res) => {
    try {
        const exist = await db.promise().query('SELECT * FROM user WHERE id = ?', [req.params.id]);
        if (exist[0].length == 0) {
            return res.status(404).json('Not found');
        }
        if (req.user.id == req.params.id) {
            const delete_account = await db.promise().query('DELETE from user where id = ?', [req.params.id]);
            if (delete_account) {
                return res.status(200).json({ "msg" : `Successfully deleted record number: ${req.params.id}` });
            }
        } else {
            res.status(498).json('Token is not valid');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

module.exports = (app) => {
    app.use(router);
};
