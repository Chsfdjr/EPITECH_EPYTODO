const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const check_id = (req, res, next) => {
    const parameters = req.params.id;
    for (var i = 0 ; i < parameters.length; i++) {
        if (parameters[i] < '0' || parameters[i] > '9') {
            return res.status(400).send('Bad parameter');
        }
     }
    next();
};

router.get('/todos', auth, async (req, res) => {
    try {
        const user_logged = req.user.id;
        const todo = await db.promise().query('SELECT * FROM todo WHERE user_id = ?', user_logged);
        res.status(200).json(todo[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.get('/todos/:id', auth, check_id, async (req, res) => {
    try {
        const user_todo = await db.promise().query(`SELECT * FROM todo WHERE user_id = ${req.user.id} and id = ${req.params.id}`);
        if (user_todo[0].length == 0) {
            return res.status(404).json('Not found');
        }
        res.status(400).json(user_todo[0][0]);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.post('/todos', auth, async (req, res) => {
    try {
        const user_logged = req.user.id;
        const todo = await db.promise().query('SELECT * FROM todo WHERE user_id = ?', req.body.user_id);
        const status = req.body.status;

        if (user_logged != req.body.user_id)
            return res.status(498).json('Token is not valid');
        else {
            if (status != "not started" && status != "todo" && status != "in progress" && status != "done") {
                console.log(status);
                return res.status(500).json('Internal server error');
            }
        }
        const [rows] = await db.promise().query('INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)', [
            req.body.title,
            req.body.description,
            req.body.due_time,
            req.body.user_id,
            status,
        ]);
        res.status(200).json(todo[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

router.put('/todos/:id', auth, check_id, async (req, res) => {
    try {
        const user_logged = req.user.id;
        const user_todo = await db.promise().query('SELECT * FROM todo WHERE id = ?', req.params.id);
        const status = req.body.status;

        if (user_todo.length == 0) {
            return res.status(404).json('Not found');
        }
        if (user_logged != req.body.user_id)
            return res.status(498).json('Token is not valid');
        else {
            if (status != "not started" && status != "todo" && status && "in progress" && status != "done") {
                console.log(status);
                return res.status(500).json('Internal server error');
            }
        }

        const update_todo = await db.promise().query('UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? where id = ?', [
            req.body.title,
            req.body.description,
            req.body.due_time,
            req.body.user_id,
            status,
            req.params.id,
        ]);
        if (update_todo) {
            res.status(400).json(update_todo);
        }
    } catch (err) {
            console.error(err);
            res.status(500).json('Internal server error');
    }
});

router.delete('/todos/:id', auth, check_id, async (req, res) => {
    try {
        const user_logged = req.user.id;
        const user_todo = await db.promise().query('SELECT * FROM todo WHERE id = ?', req.user.id);
        const delete_todo = await db.promise().query('DELETE from todo where id = ?', req.params.id);
        if (delete_todo) {
            return res.status(200).json({ "msg" : `Successfully deleted record number: ${req.params.id}` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal server error');
    }
});

module.exports = (app) => {
    app.use(router);
}