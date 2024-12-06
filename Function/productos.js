var express = require ('express');
var cors = require ("cors");
var serverless = require ('serverless-http');
var app = express ();
var productosroutes = require ("../Backend/Routes/productoroutes.js"); /*../../backend/routes/productosroutes.js*/
app.use(express.json());
app.use(cors());

var router = express.Router();
router.use ("/productos",estudiantesroutes);

var handler = app.use ('/.netlify/functions',router);
exports.handler = serverless (app);


//cuando en un solo string se tiene otro string, un string es una variable y tiene un valor, ese valor se pone entre comillas dobles "" y se quiere que el otro string este dentro de ese se usan las comillas sencillas ''. Este es un ejemplo de como seria: tenemos la valariable let. let ejemplo = "el valor del ejemplo es: "otro string""; otro string no es parte del mismo string. La unica manera de que haga parte del mismo valor se pone comilla sencilla let ejemplo = "el valor del ejemplo es: 'otro string'"; Asi no nos va a separar otro string, en la primera parte nos separa el otro string del valor del ejemplo es