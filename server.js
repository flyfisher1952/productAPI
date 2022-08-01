var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var productAPI = require("./controllers/product.controller");

app.use("/api/products", productAPI);
app.listen(8080);

console.log("Product API listening on 8080");
