const express = require('express');
const app = express();
const port = 3080;
const path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(express.static('static'));

//to get product data
app.get('/getProd', function(req, res){
  fs.readFile(__dirname + "/" + "db.json", 'utf8', function(err, data){
      console.log(data);
      res.end(data); 
  });
})

var prod = {
  "prod5": {
  "id":5,
  "name":"Top",
  "Cost":800,
  "Desc":"Chemistry"
  }
};

//add product endpoint
app.get('/addProd', function(req, res){
  //Step 2: read existing users
    fs.readFile(__dirname + "/" + "db.json", 'utf8', function(err, data){
      data = JSON.parse(data);
      data["prod5"] = prod["prod5"];
      //Step 3: append user variable to list
      var jsonContent = JSON.stringify(data);
      
      fs.writeFile("db.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }     
        console.log("JSON file has been saved.");
        res.end( JSON.stringify(data));
    });
});
})

//delete a product by id
var id = 3;

app.get('/deleteProd', function (req, res) {
   // First retrieve existing users
   fs.readFile( __dirname + "/" + "db.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["prod" + id];
      fs.writeFile("db.json", JSON.stringify(data), 'utf8', function writeJSON(err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err); 
        }
        console.log( data );
        res.end( JSON.stringify(data));  
     
  });   
   });
})

//update product price
app.get('/UpdateProd', function (req, res) {
  const fileName = './db.json';
  const file = require(fileName);
  file.prod4.Cost = 350; 
  
  fs.writeFile("db.json", JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err);
    
    console.log('writing to ' + fileName);
    console.log(JSON.stringify(file));
    res.end( JSON.stringify(file));
  });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

