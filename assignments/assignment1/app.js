const express = require("express");
const app = express();
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true })
.then(() => console.log('Connected to database'))
.catch(err =>console.error('Could no connect.....',err));


app.use(express.static(__dirname));
 
// app.get("/", (req, res) => {
//  res.sendFile(__dirname + "/index.html");
// });
// sendFile sends only index.html , hence we use static function
 


var nameSchema = new mongoose.Schema({
 firstName: String,
 lastName: String,
 email: String,
 rating: Number,
 review: String
});

var User = mongoose.model("User", nameSchema);

app.post("/submit", (req, res) => {
 var myData = new User(req.body);
 
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});


app.listen(port, () => {
 console.log("Server listening on port " + port);
});












