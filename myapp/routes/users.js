var request = require('request');
var mysql = require('mysql');
var express = require('express');
var parser =  require('body-parser');
var _ = require('lodash');
var multer  =   require('multer');



var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'root',
database : 'user'
});

var router = express.Router();
router.use(parser.urlencoded({ extended: false }));
router.use(parser.json());


/* GET users listing. */
router.post('/ListUser', function(req, res, next){
	
	var user_id = req.body.id;
	console.log('select * from RegisterUser where id ='+ "'" +user_id+"'");
	connection.query('select * from RegisterUser where id ='+ "'" +user_id+ "'", function(err, rows, fields){
                if(err){
                console.log(err);
                }
                else{
                        if(rows.length==0){
                                console.log("no records found");
                                
                        }
                        else{
                                console.log(rows);
				res.send(rows);
                                
                        }
                }


	});
});

router.post('/LoginUser', function(req, res, next) {

	var user_email = req.body.email;
	var user_password = req.body.pass;
console.log('select * from RegisterUser where email ='+ "'" +user_email+ "'" + 'and password=' + "'"+user_password+"'");
	 connection.query('select * from RegisterUser where email ='+ "'" +user_email+ "'" + 'and password=' + "'"+user_password+"'" , function(err, rows, fields){
                if(err){
                console.log(err);
                }
                else{
			if(rows.length==0){
				console.log("Account doesnt exists. Please register.");	
				res.send("false");
			}
			else{
				console.log("----Successfully logged in!!!----");
				//console.log(rows);
				res.send(rows);
			}
		}

  
	});
});


router.post('/RegisterUser', function(req, res, next) {

	console.log("----",req.body,"-----");
	var user_id = req.body.id;
	var user_email=req.body.email;
        var user_password=req.body.pwd;
	var user_name = req.body.name;
	var user_surname = req.body.srname;
	var user_mobile = req.body.mob;
var filename = req.body.fileName;
//	var image = req.body.image;


		 connection.query('select * from RegisterUser where email ='+ "'" +user_email+ "'" , function(err, rows, fields){
                if(err){
                console.log(err);
                }
                else{
			if(rows.length==0){

                	
			connection.query('INSERT into RegisterUser (email,password,name,surname,mobile,image) values("'+user_email+'", "'+user_password+'", "'+user_name+'", "'+user_surname+'", "'+user_mobile+'", "'+filename+'")', function(error,rows,columns){
			if(!error){
			console.log("Record inserted.");
			res.send("record inserted!!!");
			console.log(rows);
			}
			else{
			console.log(error);
		}
		})
	}
			else{
				res.send("Account already exists. Please login.");	
				console.log("Account already exists. Please login.");
			}
	}	
});
	
});		
                	
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('myFile');

router.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});



router.post('/UpdateUser', function(req, res, next){

	upload(req,res,function(err) {
	console.log(err);
        if(err) {
            return res.end("Error uploading file.");
        }
        	res.end("File is uploaded");
    	});	
/*
	console.log(req.body);	
        var user_id = req.body.id;
	var user_email=req.body.email;
        var user_password=req.body.pwd;
        var user_name = req.body.name;
        var user_surname = req.body.srname;
        var user_mobile = req.body.mob;
//	var image = req.body.image;


		console.log('UPDATE RegisterUser SET email='+ "'"+user_email+"'" +',password='+ "'"+user_password+"'" +',name='+ "'"+user_name+"'" +',surname='+ "'"+user_surname+"'" + ',mobile=' +"'"+user_mobile+"'" +" where id ='" + "'"+user_id +"'" );
                
	if(_.isNil(user_id)){
	connection.query('INSERT into RegisterUser (email,password,name,surname,mobile,image) values("'+user_email+'", "'+user_password+'", "'+user_name+'", "'+user_surname+'", "'+user_mobile+'" )' , function(error,rows,columns){

                if(error){
                	console.log(error);
                }
                else{
                        
                                console.log("Record inserted successfully!!!");

                        }
		})
	}                        
	else{
            
	connection.query('UPDATE RegisterUser SET email='+ "'"+user_email+"'" +',password='+ "'"+user_password+"'" +',name='+ "'"+user_name+"'" +',surname='+ "'"+user_surname+"'" + ',mobile=' +"'"+user_mobile+"'" +'where id =' + "'"+user_id +"'"  , function(error,rows,columns){
                if(error){
                	console.log(error);
                }
                else{

                                console.log("Record updated successfully!!!");

                        }
                })
               
		
              }
   */   
});
module.exports = router;
