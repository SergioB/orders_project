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

const itemsQuery = [
    {
        $group: {
            _id:'$orderedItem',
            count: { $sum: 1 }
        }
    },
    {
        $sort : { count : -1, _id: 1 }
    }
];

router.get('/items', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.aggregate(itemsQuery).then ((docs) => {
        res.render('items', {'items' : docs});
    });
});

//
// REST api routes
//
router.get('/api/items', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.aggregate(itemsQuery).then ((docs) => {
        res.json( docs);
    });
});


router.delete('/api/:orderId', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    orders.remove({'orderId':req.params.orderId})
        .then(() => {
        })
});

router.get('/api', function (req, res, next) {
    const db = req.db;
    const orders = db.get('orders');
    let query = {};
    if (req.query.company) {
        query['companyName'] = req.query.company;
    }
    if (req.query.address) {
        query['customerAddress'] = req.query.address;
    }

    orders.find(query)
        .then ((docs) => {
            res.json( docs);
        });
});

module.exports = router;
