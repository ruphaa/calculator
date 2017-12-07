var express = require('express');
var mongoose = require('mongoose');
var mongooseQuery = (function(){

  var calculationSchema = mongoose.Schema({
    input1 : String,
    input2 : String,
    operation : String,
    result : String
  });
  var Calculation = mongoose.model("Calculation",calculationSchema); // Here Calculation refers to the Collection in the mongoDB

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
          var newCalculation = new Calculation({
            input1 : num1 ,
            input2 : num2 ,
            operation : value,
            result : result
          });

          newCalculation.save(function(err,Calculation){
            if(err) console.log('Oops , something went wrong');
            else {
              console.log("successfully inserted");
            }

          });
            //callback(result);
            //return result;

            //db.close();
            resolve(result);
          });
        // });

    };

    var retrieveFromDB = function(){
      return new Promise(function(resolve,reject){
        var array = {};
        // var MongoClient = require('mongodb').MongoClient;
        // var url = "mongodb://dev:passw0rd@ds125255.mlab.com:25255/mydatabase";
        console.log('Hey');
          var array = Calculation.find({},function(err,result){
            if(err) console.log('Oops');
            else{
            //  console.log(result);
              return result;
            }
          });
           //console.log(array);
            resolve(array);
          });



    };

  return{
    insertIntoDB : insertIntoDB,
    retrieveFromDB : retrieveFromDB
    //connectToDB : connectToDB
  }

})();

module.exports = mongooseQuery;
