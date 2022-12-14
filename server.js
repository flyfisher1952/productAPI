var express = require("express");
var app = express();
var bodyparser = require("body-parser");

// body-parser MUST be added BEFORE the controller 'app.use' statement or it won't work.
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var cors = require("cors");
app.use(cors());

var productAPI = require("./controllers/product.controller");

app.use("/api/products", productAPI);
app.listen(8085);

console.log("Product API listening on 8085");
