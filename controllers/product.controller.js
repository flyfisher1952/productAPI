var dbconn = require("../config/db_connection");
var connection = dbconn.getConnection();
var express = require("express");
var router = express.Router();

connection.connect(function (err) {
    if (err) {
        console.log("Error connecting --> ", err.stack);
        return;
    }

    console.log("Connected as ", connection.threadId);
});

router.get("/", (req, resp) => {
    connection.query("select * from product", (err, records, fields) => {
        if (err) {
            console.error("Error - ", err);
        } else {
            resp.send(records);
        }
    });
});

router.get("/:id", (req, resp) => {
    connection.query("select * from product where id = " + req.params.id, (err, records, fields) => {
        if (err) {
            console.error("Error - ", err);
        } else {
            resp.send(records);
        }
    });
});

router.post("/", (req, resp) => {
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;

    var sql = "insert into product values (" + id + ",'" + name + "','" + description + "'," + price + ")";
    console.log("*** " + sql + " ***");

    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Insert Error - ", err);
        } else {
            resp.send({ insert: "success" });
        }
    });
});

router.put("/", (req, resp) => {
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;

    var sql = "update product set name='" + name + "', price=" + price + " where id=" + id;
    console.log("*** " + sql + " ***");

    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Update Error - ", err);
        } else {
            resp.send({ update: "success" });
        }
    });
});

router.delete("/:id", (req, resp) => {
    connection.query("delete from product where id=" + req.params.id, (err, records, fields) => {
        if (err) {
            console.error("Error - ", err);
        } else {
            resp.send({ delete: "success" });
        }
    });
});

module.exports = router;
