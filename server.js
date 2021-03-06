var express = require('express');
var app = express();
var massive = require('massive');
var http = require('http').createServer(app);
const bodyParser = require("body-parser");
var cors = require('cors')
const { Client } = require('pg');
var connection_string = "postgres://vinsmrhumjjhvh:8a593a286c542ea5dc58642686f606db229a3d7a5262c133cfab2afe4a4f277e@ec2-54-235-208-103.compute-1.amazonaws.com:5432/detvnn3mdquvt";

const client = new Client({
  connectionString: connection_string,
  ssl:true
});

async function get_db(){
	global.db = await massive({
	  host: 'ec2-54-235-208-103.compute-1.amazonaws.com',
	  port: 5432,
	  database: 'detvnn3mdquvt',
	  user: 'vinsmrhumjjhvh',
	  ssl:true,
	  password: '8a593a286c542ea5dc58642686f606db229a3d7a5262c133cfab2afe4a4f277e',
	  poolSize: 10

	});

	global.db.spectra_status.update({lot_number:'12345'},{detail:'A'});
}

get_db();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(cors())


app.get("/",function(req,res){
	res.send("Confirmed")
})

app.post("/table",async function(req,res){

	var table =  req.param("table");
	var fields = req.body;
	console.log(req.body);

	res.header("Access-Control-Allow-Headers","*");
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	var obj = {};

	fields.forEach(function(field){
		if(field.column_name.indexOf("_id") !== -1){
			return
		}

		if(field.data_type === "integer" || field.data_type === "smallint"){
			obj[field.column_name] = parseInt(field.value)
		} else {
			obj[field.column_name] = field.value
		}
		
	})

	console.log(obj)

	global.db[table].insert(obj)

	res.send("Saved");

})


app.get("/table",async function(req,res){
	var table =  req.param("table");
	var schema =  req.param("schema");


	if(typeof schema === "string"){
		schema = eval(schema);
	}

	res.header("Access-Control-Allow-Headers","*");
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

	//var socket_id = req.body.socket_id;

	if(!schema){
		res.send(await global.db[table]["find"]({}))
		return
	}

	var fields = await global.db.query("select column_name, data_type, character_maximum_length from INFORMATION_SCHEMA.COLUMNS where table_name = '"+table+  "'" )

	// var response = JSON.stringify(fields)

	res.send(fields)
	return


})


app.post("/database",async function(req,res){
	res.header("Access-Control-Allow-Headers","*");
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

	//var socket_id = req.body.socket_id;

	console.log(req.body);
	var table = req.body.table;
	var obj = req.body.obj;
	var obj2 = req.body.obj2;
	var function_name = req.body.function_name;


	if(typeof obj === "string"){
		obj = JSON.stringify(obj);
	}
	if(typeof obj2 === "string"){
		obj2 = JSON.stringify(obj2);
	}
	try{
		var db_obj = await global.db[table][function_name](obj,obj2);
		console.log(global.db[table][function_name]);
		req.body.result = db_obj;
		//req.body.emitting_socket_id = socket_id;
		//io.emit("database_query",req.body);

		res.send(db_obj)
	} catch(e){
		console.log(e);
		res.send(e);
	}
})

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on *:3000');
});
