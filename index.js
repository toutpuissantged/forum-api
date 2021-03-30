const express=require("express") ;
const bodyParser=require("body-parser");
const routes= require('./routes/route')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/base.db');

db.each('SELECT id, login , password FROM userinfo WHERE id=1', function(err, row) {
    console.log(row.id + ': ' + row.login+': '+row.password);
  });

const app = express();

app.use(bodyParser.json());

app.use('/api',routes)

app.listen(5000,() => {
     console.log(`app is listening to  http://localhost:5000`);
})
