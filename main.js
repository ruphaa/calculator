
var express = require('express');
var app = express();
var calc = require('./calculation');
//var mongoQuery = require('./insert');
var mongooseQuery = require('./database');
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('promise');
var mongoose = require('mongoose');

 mongoose.connect("mongodb://<user-name>:<password><mlabs-uri>/<db-name>",function(){
     console.log('Connection is established');
 });





var accessHeader = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(accessHeader);
app.use(express.static('public'))

//in order include the static css and js files we have to include all the css and js files into the public folder and then require path(that is install it or put it in package.json)
//mongoQuery.connectToDB();

app.get('/calculator',function(req,res){
  res.sendFile(path.join(__dirname+'/index2.html'));
});

app.post('/add',function(req,res){
  console.log('Add function..');
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var result = calc.add(num1,num2);
  /*mongoQuery.insertIntoDB(num1,num2,'+',result)
    .then(function(result){
      console.log('Inserted successfully');
      return mongoQuery.retrieveFromDB();
    }).then(function(array){
      console.log('Retrieved successfully');
      // res.send(JSON.stringify({response:result,history:array}));
      res.json({response:result,history:array});
    }).catch(function(){
      res.status = 500;
      res.send({response:'Oops , Something went wrong'});
    });*/
   mongooseQuery.insertIntoDB(num1,num2,'+',result)
   .then(function(result){
      return mongooseQuery.retrieveFromDB();
   }).then(function(array){
     console.log(array);
      res.json({response:result,history:array});
    }).catch(function(){
      res.status = 500;
      res.send({response:'Oops , Something went wrong'});
    });

});

app.post('/sub',function(req,res){
  console.log('Sub function..');
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var result = calc.sub(num1,num2);
  /*mongoQuery.insertIntoDB(num1,num2,'-',result)
    .then(function(result){
      console.log('Inserted successfully');
      return mongoQuery.retrieveFromDB();
    }).then(function(array){
      console.log('Retrieved successfully');
      // res.send(JSON.stringify({response:result,history:array}));
      res.json({response:result,history:array});
    }).catch(function(){
      res.status = 500;
      res.send({response:'Oops , Something went wrong'});
    });*/

    mongooseQuery.insertIntoDB(num1,num2,'-',result)
    .then(function(result){
       return mongooseQuery.retrieveFromDB();
    }).then(function(array){
      //console.log(array);
       res.json({response:result,history:array});
     }).catch(function(){
       res.status = 500;
       res.send({response:'Oops , Something went wrong'});
     });

});

app.post('/mult',function(req,res){
  console.log('Multiply function..');
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var result = calc.mult(num1,num2);

  /*mongoQuery.insertIntoDB(num1,num2,'*',result)
    .then(function(result){
      console.log('Inserted successfully');
      return mongoQuery.retrieveFromDB();
    }).then(function(array){
      console.log('Retrieved successfully');
      // res.send(JSON.stringify({response:result,history:array}));
      res.json({response:result,history:array});
    }).catch(function(){
      res.status = 500;
      res.send({response:'Oops , Something went wrong'});
    });*/

    mongooseQuery.insertIntoDB(num1,num2,'*',result)
    .then(function(result){
       return mongooseQuery.retrieveFromDB();
    }).then(function(array){
      //console.log(array);
       res.json({response:result,history:array});
     }).catch(function(){
       res.status = 500;
       res.send({response:'Oops , Something went wrong'});
     });
});

app.post('/divide',function(req,res){
  console.log('Divide function..');
  var num1 = req.body.num1;
  var num2 = req.body.num2;
  var result = calc.divide(num1,num2);

  /*mongoQuery.insertIntoDB(num1,num2,'/',result)
    .then(function(result){
      console.log('Inserted successfully');
      return mongoQuery.retrieveFromDB();
    }).then(function(array){
      console.log('Retrieved successfully');
      // res.send(JSON.stringify({response:result,history:array}));
      res.json({response:result,history:array});
    }).catch(function(){
      res.status = 500;
      res.send({response:'Oops , Something went wrong'});
    });*/

    mongooseQuery.insertIntoDB(num1,num2,'/',result)
    .then(function(result){
       return mongooseQuery.retrieveFromDB();
    }).then(function(array){
      //console.log(array);
      console.log('retrieved');
       res.json({response:result,history:array});
     }).catch(function(){
       res.status = 500;
       res.send({response:'Oops , Something went wrong'});
     });
});

app.post('/display-results',function(req,res){
    console.log('Display results');
  /*  mongoQuery.retrieveFromDB()
    .then(function(response){
      console.log('Came in');
      res.send(response);
    }).catch(function(){
      res.status = 500;
      res.json({error: "something went wrong"});
    });*/

    mongooseQuery.retrieveFromDB()
    .then(function(response){
      res.send(response)
    }).catch(function(){
      res.status = 500;
      res.json({error:"Something went wrong"});
    })
  });

app.listen(8080,function(req,res){
  console.log('server is listening');
});


// app.post('/add',function(req,res){
//   console.log('hello');
//   var num1 = req.body.num1;
//   var num2 = req.body.num2;
//   console.log('came');
//   //console.log(calc.add(num1,num2));
//
//   //res.send('hello');
//   res.contentType('json');
//   var result = calc.add(num1,num2);
//   mongoQuery.insertintodb(num1,num2,'+',result);
// mongo.gethistory()
//   setTimeout(function(){
//     res.send(JSON.stringify({response:result}))
//   },5000);
//
//   //res.json({Result : calc.add(num1,num2)})
//   /*console.log('came');
//   res.send({ some: JSON.stringify({response:calc.add(num1,num2)}) });
//   console.log('came 2');
//   res.end(JSON.stringify(response));*/
//   //res.send(calc.add(num1,num2));
// });

// mongoQuery.insertintodb(num1,num2,'-',result, function(insertResponse){
//   console.log("insert callback");
//   console.log(response);
//   mongoquery.gethistory(function(historyResponse){
//     res.json(history:historyResponse, insert: insertResponse);
//   });
//   // res.send(JSON.stringify({response:response}));
// });

// setTimeout(function(){
//   res.send(JSON.stringify({response:result}))
// },5000);
