const express = require('express')
const router = express.Router();

const mongoose = require('mongoose');

// Schema's in the model directory
const Events = require('../modules/events');


router.get('/', (req, res, next) =>{
   Events.find()
   .exec()
   .then(docs =>{
       console.log(docs);
    //    if (docs.length >= 0){
       res.status(200).json(docs);
    // }
    // else {
    //     res.status(404).json({
    //         message: "No data Found"
    //     })
    // }
   })
   .catch(err =>{
       console.log(err)
       res.status(500).json({
           error: err
       })
   })
});

router.post('/', (req, res, next) =>{
    const event = new Events({
        _id : new mongoose.Types.ObjectId(),
        title: req.body.title,
        host: req.body.host,
        venue: req.body.venue
    });
    event.save()
    .then( result =>{
        console.log(result);
        res.status(201).json({
            message: 'Event added Successfully',
            creatEvent: result
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
    res.status(200).json({
        message: 'Successful',
        data: event
    });
});

router.get('/:id', (req, res, next) =>{

    const id = req.params.id;
    Events.findById(id)
   .exec()
   .then(doc => {
       console.log("From database",doc)
       if(doc){
        res.status(200).json(doc)
       }
       else {
           res.status(404).json({
               message: 'Not Valid entry Found'
           })
       }
   })
   .catch(err =>{
       console.log(err);
       res.status(500).json({
        error : err
       });
   });
});

    router.patch('/:id', (req, res, next) =>{
        const id = req.params.id;
        const updates = {};
        for(const ops of req.body){
            updates[ops.propTitle] = ops.value;
        }
       Events.update({_id : id}, {$set : {updates}})
       .exec()
       .then(result =>{
           console.log()
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    });

    router.delete('/:id', (req, res, next) =>{
       const id = req.params.id;
        Events.remove({_id : id}).exec()
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    });


module.exports = router;