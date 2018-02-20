/*
Author: Gokturk Enez
Mail: hi@gokturkenez.com.tr
Description: PayU Turkey Report API Node JS Sample Code
*/


SecretKey = 'SECRET_KEY';

var moment = require('moment');
date = moment.utc().format('X').toString();

var array = {
    'merchant': "OPU_TEST",
    'startDate': "2017-09-20",
    'endDate': "2017-09-21",
    'timeStamp': date

};

hashstring = '';

for (var k in array) {
    hashstring += array[k].length + array[k] ;
}
console.log(hashstring)
var hash = require('crypto')
    , data = hashstring
    , secretkey = SecretKey;

signature = hash.createHmac('md5', secretkey).update(data).digest('hex');
array['signature'] = signature;

var EndPointURL = 'https://secure.payu.com.tr/reports/products'+"?merchant="+array['merchant']+"&startDate="+array['startDate']+"&endDate="+array['endDate']+"&timeStamp="+array['timeStamp']+"&signature="+signature
console.log(EndPointURL)

var request = require("request");
request.post(EndPointURL, {form:array}, function(error, response, body) {
    console.log(body);

});
