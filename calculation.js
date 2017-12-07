

var express = require('express');
var calculator = (function() {

  var add = function(a,b){
    return parseInt(a,10)+parseInt(b,10);
  };

  var sub = function(a,b){
    return parseInt(a,10)-parseInt(b,10);
  };

  var mult = function(a,b){
    return parseInt(a,10)*parseInt(b,10);
  };

  var divide = function(a,b){
    var value =  parseInt(a,10)/parseInt(b,10);
    return value.toFixed(3);
  };

  var helloworld = function(){
    return "yoyo";
  };

  return {
    add: add,
    sub: sub,
    mult: mult,
    divide: divide,
    helloworld: helloworld
  };

})();

module.exports = calculator;
