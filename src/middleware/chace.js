const { required } = require("@hapi/joi");

// const {user}=require('../models')
// const newQuery = (query).replace(" ","");
// const newQuery = (query).replace(" ","");
//              client.get(`books:${newQuery}`, async (err, result) => {
//                 // If that key exist in Redis store
//                 if (result) {
//                   const resultJSON = JSON.parse(result);
//                   return helper.response(response, 200, resultJSON,pagination)
//                 } else { // Key does not exist in Redis store
//                   // Fetch directly from Wikipedia API
//                   const resultJ = await dataModels.getAllDataJoin('books,author,genre',query,select)
//                   console.log(newQuery)
//                   client.setex(`books:${newQuery}`, 3600, JSON.stringify(resultJ, null, 0), function(err,reply){
//                     if(err) throw err  
//                     console.log(reply)
//                   });

//                   return helper.response(response, 200, resultJ,pagination)
//                 }
//             });

            // return user
