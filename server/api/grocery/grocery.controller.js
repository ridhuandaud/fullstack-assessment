var Grocery = require("../../database").Grocery;

exports.list = function(req,res){
    var whereCondition = {};
    var page = parseInt(req.query.page) || 1;
    var items = parseInt(req.query.items) || 10;
    var offset = (page - 1) * items;
    var limit = items;
    var sortBy = req.query.sortBy || 'ASC';
    var brand = '';
    var name = '';
    var order = 'name '+sortBy;

    console.log(req.query.searchType);

    if((typeof req.query.searchType !== 'undefined')) {
        if(typeof req.query.searchType === 'string'){
            if(req.query.searchType=='Brand') {
                brand = req.query.keyword;
                order = 'brand '+sortBy;
            }
            if(req.query.searchType=='Name') {
                name = req.query.keyword;
            }
        } else {
            brand = req.query.keyword;
            name = req.query.keyword;
        }
    }

    if(brand && name) {
        whereCondition = {
            where: {
                brand: {
                    $like: "%" + brand + "%"
                },
                name: {
                    $like: "%" + name + "%"
                }
            },
            order: order,
            offset: offset,
            limit: limit
        }
    } else {
        if(brand) {
            whereCondition = {
                where: {
                    brand: {
                        $like: "%" + brand + "%"
                    }
                },
                order: order,
                offset: offset,
                limit: limit
            }
        }
        else if(name) {
            whereCondition = {
                where: {
                    name: {
                        $like: "%" + name + "%"
                    }
                },
                order: order,
                offset: offset,
                limit: limit
            }
        }
        else {
            whereCondition = {
                order: order,
                offset: offset,
                limit: limit
            }
        }
    }

    Grocery
        .findAndCountAll(whereCondition)
        .then(function (result) {
            if (result) {
                console.log(result);
                res.json(result);
            } else {
                res.status(400).send(JSON.stringify("Record Not Found"));
            }
        });
};

exports.show = function(req,res){
    Grocery
        .findOne({
            where: {
                id: Number(req.params.productId)
            }
        })
        .then(function(result){
            if (result) {
                console.log(result);
                res.json(result);
            } else {
                res.status(400).send(JSON.stringify("Record Not Found"));
            }
        });
};

exports.update = function(req,res){
    Grocery
        .find({
            where: {
                id: Number(req.params.productId)
            }
        })
        .then(function(result){
            result.updateAttributes({
                upc12: req.body.upc12,
                brand: req.body.brand,
                name: req.body.name
            }).then(function (){
                console.log("update done");
                res.status(200).end();
            }).catch(function (){
                console.log("update failed");
                res
                    .status(500)
                    .json({error: true, errorText: "Update Failed"})
            });
        })
        .catch(function(err){
            console.log("err", err);
            res
                .status(500)
                .json({error: true, errorText: "Record not found"})
        });

};

exports.delete = function(req,res){
    Grocery
        .destroy({
            where: {
                id: req.params.productId
            }

        })
        .then(function(result) {
            console.log("deleted");
            res
                .status(200)
                .json(result)
        })
        .catch(function(err){
            console.log("err", err);
            res
                .status(500)
                .json({error: true})
        })

};
