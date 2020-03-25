var express = require('express');
var router = express.Router();
var Task = require('../model/taskModel.js');
router.get('/', function (req, res) {
    res.render('index');
});

router.get('/tasks', function (req, res) {
    Task.find(function (err, data) {
        if (err)
            return next(err);
        res.json(data);
    });
});

router.post('/tasks', function (req, res, next) {
    Task.create(req.body, function (err, post) {
        console.log(req.body);
        if (err)
            return next(err);
        console.log(post);
        res.json(post);
    });
});

router.put('/tasks/:id', async function (req, res, next) {
    const exists = await Task.findById(req.params.id);
    if (exists) {
        Task.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).send("There was a problem updating the task.");
            }
            res.status(200).send(data);
        });
    } else {
        Task.create(req.body, function (err, data) {
            console.log(req.body);
            if (err)
                return next(err);
            res.json(data);
        });
    }
});

router.patch('/tasks/:id', function (req, res, next) {
    Task.findById(req.params.id, (err, data) => {
        if (req.body._id) {
            delete req.body._id;
        }
        for (let b in req.body) {
            data[b] = req.body[b];
        }
        data.save();
        res.json(data);
    });
});

router.delete('/tasks/:id', function (req, res, next) {
    Task.findByIdAndRemove({_id: req.params.id}, (err, result) => {
        if (err) {
            console.log("error ocurred while deletion:", err);
            res.status(500).send(err);
        } else {
            res.status(204).json(result);
        }
    });
});


module.exports = router;
