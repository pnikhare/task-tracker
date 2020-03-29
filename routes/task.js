var express = require('express');
var router = express.Router();
var Task = require('../model/taskModel.js');
router.get('/', function (req, res) {
    res.render('index');
});

router.get('/tasks', function (req, res) {
    try {
    Task.find(function (err, data) {
        if (err)
            return next(err);
        res.json(data);
        //res.render('index',{"json":data});
    });
}catch(err){
    res.status(500).send(err);
}
});

router.get('/tasks/:id', async function (req, res) {
    try{
    const exists = await Task.findById(req.params.id);
    if (exists) {
    Task.find({_id : req.params.id},function (err, data) {
        if (err){
            console.log(err);
            return next(err);
        }
        res.send(data);
    });
    }else{
        res.status(404).send("Not Found");
    }
}catch(err){
    res.status(500).send(err);
}
});

router.get('/tasks/status/:status', function (req, res) {
    try {
    console.log(req.params.status);
    Task.find({status : req.params.status},function (err, data) {
        if (err){
            console.log(err);
              // return next(err);
        }
        res.json(data);
    });
}catch(err){
    res.status(500).send(err);
}
});

router.get('/tasks/deadline/:deadline', function (req, res) {
    try{
    console.log(req.params.deadline);
    Task.find({deadline : {$lt: req.params.deadline}},function (err, data) {
        if (err){
            console.log(err);
             return res.status(500).send(err);
        }
        res.json(data);
    });
}catch(err){
    res.status(500).send(err);
}
});

router.get('/tasks/:id/status', async function (req, res) {
    const exists = await Task.findById(req.params.id);
    if (exists) {
    Task.find({_id : req.params.id},function (err, data) {
        if (err){
            console.log(err);
        }
        res.send(data[0].status);
    });
    }else{
        res.status(404).send("Not Found");
    }
});

router.post('/tasks', function (req, res, next) {
    try{
    Task.create(req.body, function (err, post) {
        console.log(req.body);
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return next(err);
        }

        console.log(post);
        res.status(201).json(post);
    });
}catch(err){
    res.status(500).send(err);
}
});

router.put('/tasks/:id', async function (req, res, next) {
    try{
       if(req.body._id != req.params.id){
           return res.status(400).send("task id in request and body don't match");
       }
    const exists = await Task.findById(req.params.id);
    if (exists) {
        Task.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).send("There was a problem updating the task.");
            }
            res.status(200).json(data);
        });
    } else {
        Task.create(req.body, function (err, data) {
            console.log(req.body);
            if (err)
                return next(err);
            res.json(data);
        });
    }
}catch(err){
    res.status(500).send(err);
}
});

router.patch('/tasks/:id', async function (req, res, next) {
    try{
         if(req.body._id != req.params.id){
           return res.status(400).send("task id in request and body don't match");
       }
    const exists = await Task.findById(req.params.id);
    if (exists) {
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
    } else {
        res.status(404).json(JSON.parse('{"Error" : "ID not Found"}'));
    }
}catch(err){
    res.status(500).json(err);
}
});

router.delete('/tasks/:id', async function (req, res, next) {
    try{
     const exists = await Task.findById(req.params.id);
    if (exists) {
        Task.deleteOne({_id: req.params.id}, (err, result) => {
        if (err) {
            console.log("error while removing task:", err);
            res.send(err);
        } else {
            res.send("Task is deleted");
        }
    });
    } else {
    res.status(404).send('"Error" : "ID not Found"');
    }
}catch(err){
    res.status(500).send(err);
}
});


module.exports = router;
