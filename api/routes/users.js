const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Get Request users'
    });
});

// router.post('/', (req, res, next) =>{
//     res.status(201).json({
//         message: 'Post Request to users'
//     });
// });

router.get('/id', (req, res, next) =>{
    res.status(200).json({
        message: 'Get Request users',
        id: req.params.id
    });
});

module.exports = router;
