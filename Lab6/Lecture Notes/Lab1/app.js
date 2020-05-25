const express = require('express');
const connection = require('./data/mongoConnection');

const app = express();
const configRoutes = require('./routes');
urlCount = {};
app.use(express.json());

app.use((req, res, next) =>{
  let data = req.path+req.method
  if(!urlCount[data]) urlCount[data] = 0
  urlCount[data]+=1;
  console.log("###################################################")
  console.log("URL PATH: ",req.originalUrl)
  console.log("HTTP METHOD/VERB: ",req.method)
  console.log("No. of times URL requested: ",urlCount[data])
  console.log("Request Body: ",req.body)
  console.log("###################################################")
  next();
});



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
