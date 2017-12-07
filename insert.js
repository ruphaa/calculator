var express = require('express');

var mongoQuery = (function(){
    var db;

/*    var connectToDB = function(){
      var MongoClient = require('mongodb').MongoClient;
      var url = "mongodb://dev:passw0rd@ds125255.mlab.com:25255/mydatabase";
        MongoClient.connect(url, function(err, database) {
          if (err) reject();
          db=database;
          console.log('DB connection established');
        });
    };*/

    var insertIntoDB = function(num1,num2,value,result){
      return new Promise(function(resolve,reject){

        console.log(num1+' '+num2+' '+value);
        //MongoClient.connect(url, function(err, db) {
          //if (err) reject();
          var myobj = {
            input1: num1, input2: num2, operation: value , result: result
          };
            db.collection("Arithmetics").insertOne(myobj, function(err, res) {
            if (err) reject();
            console.log("1 record inserted");
            //callback(result);
            //return result;

            //db.close();
            resolve(result);
          });
        // });
      });
    };

    var retrieveFromDB = function(){
      return new Promise(function(resolve,reject){
        var array = {};
        // var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://dev:passw0rd@ds125255.mlab.com:25255/mydatabase";

          db.collection("Arithmetics").find({}).toArray(function(err, result) {
            if (err) reject();
            //console.log(result);
            array = result;
            //console.log(array);
            // callback(array);
            // db.close();
            resolve(array);
          });

      });

    };

  return{
    insertIntoDB : insertIntoDB,
    retrieveFromDB : retrieveFromDB
    //connectToDB : connectToDB
  }

})();

module.exports = mongoQuery;
