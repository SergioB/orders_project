var express = require('express');
var router = express.Router();
var data = require('../models/defaultdata');


router.get('/', function(req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.find({})
        .then((docs) => {
            res.render('orders', {'orders' : docs});
        })
});

router.get('/refreshdata', function(req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.remove({})
        .then(() => {
          orders.insert(data.getData());
        })
        .then(() => {
            res.send("data inserted");
        });

});

router.get('/company', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.find({'companyName':req.query.company})
        .then((docs) => {
            res.render('orders', {'orders' : docs});
        });
});

router.get('/address', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.find({'customerAddress':req.query.address})
        .then((docs) => {
            res.render('orders', {'orders' : docs});
        })
});


router.get('/delete', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.remove({'orderId':req.query.order})
        .then(() => {
            res.render('delete', {'orderId' : req.query.order});
        })
});

router.get('/items', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.aggregate([
        {
            $group: {
                _id:'$orderedItem',
                count: { $sum: 1 }
            }
        },
        {
            $sort : { count : -1, _id: 1 }
        }
    ]).then ((docs) => {
        res.render('items', {'items' : docs});
    });
});


module.exports = router;
