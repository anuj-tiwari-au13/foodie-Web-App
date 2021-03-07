const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { update } = require('../models/menuModel');
const Menu = require('../models/menuModel');


router.get('/', (req, res, next) => {
    Menu.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const items = {
        name: req.body.name,
        price: req.body.price
    };
    const item = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
        
    });
    item.save()
        .then(result => {
            console.log(result);
            
    res.status(200).json({
        message: 'POST requests',
        createdMenu:result
    });
        })
        .catch(err =>
            console.log(err));
            res.status(500).json({
                     error: err
                    });
    
});


router.get("/:menuId", (req, res, next) => {
    Menu.findById(_id)
        .exec()
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry Found for provided ID' });
            }
        })
        .catch(e => {
            console.log(e);
            res.status(500).json({ error: e });
        });
});


router.patch("/:menuId", (req, res, next) => {
    const id = req.params.menuId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.Value;
    }

    Menu.findOneAndUpdate({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
    })
}
)

router.delete("/:menuId", (Req, res, next) => {
    const id= req.params.menuId;
    Menu.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
    })
        .catch (e=>{
            console.log(e.message);
            res.status(500).send('Error is saving')
        })
    
})


module.exports = router ;