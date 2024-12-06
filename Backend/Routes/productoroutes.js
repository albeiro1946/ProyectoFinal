const express = require("express");
const router = express.Router();
const productoscontroller = require("../controllers/ProductosController.js");

router.get("/",productoscontroller.consultar);

module.exports = router;